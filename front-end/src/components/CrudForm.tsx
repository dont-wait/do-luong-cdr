import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, Form, Button, Table, Alert, ListGroup } from "react-bootstrap";
import { CrudFormProps, Field, FormType } from "../types/types";
import { useToast } from "../hook/useToast";
import { postData, getData } from "../utils/helps";

const CrudForm = ({
  formType = FormType.BASIC,
  title,
  fields,
  onSubmit,
  apiEndpoint,
  existingData = [],
  parentData = [],
  parentDisplayField = "name",
  childRelationField,
  childApiEndpoint,
  initialValues = {},
}: CrudFormProps) => {
  // State for temporary saved items before final submission
  const [pendingItems, setPendingItems] = useState<object[]>([]);
  const [selectedParent, setSelectedParent] = useState<object | null>(null);
  const [childItems, setChildItems] = useState<object[]>([]);
  const [selectedItems, setSelectedItems] = useState<object>({});
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
  });

  // Effect to fetch child data when parent is selected in hierarchical form
  useEffect(() => {
    if (
      formType === FormType.HIERARCHICAL &&
      selectedParent &&
      childApiEndpoint
    ) {
      setIsLoading(true);
      getData(`${childApiEndpoint}/${selectedParent.id}`)
        .then((response) => {
          setChildItems(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching child data:", err);
          setIsLoading(false);
        });
    }
  }, [formType, selectedParent, childApiEndpoint]);

  // Function to handle adding an item to the pending list
  const handleAddItem = (data: object) => {
    // For checkbox form, combine form data with selected items
    if (formType === FormType.CHECKBOX) {
      const selectedKeys = Object.keys(selectedItems).filter(
        (key) => selectedItems[key]
      );

      if (selectedKeys.length === 0) {
        showToast("Please select at least one item", "info");
        return;
      }

      const selectedData = existingData.filter((item) =>
        selectedKeys.includes(item.id.toString())
      );

      // Combine form data with selected items
      const newItems = selectedData.map((item) => ({
        ...item,
        ...data,
      }));

      setPendingItems([...pendingItems, ...newItems]);
      setSelectedItems({});
    }
    // For hierarchical form, add relationship to parent
    else if (formType === FormType.HIERARCHICAL && selectedParent) {
      const newItem = {
        ...data,
        [childRelationField]: selectedParent.id,
      };

      if (editingIndex >= 0) {
        const updatedItems = [...pendingItems];
        updatedItems[editingIndex] = newItem;
        setPendingItems(updatedItems);
        setEditingIndex(-1);
      } else {
        setPendingItems([...pendingItems, newItem]);
      }
    }
    // For basic form, just add the data
    else {
      if (editingIndex >= 0) {
        const updatedItems = [...pendingItems];
        updatedItems[editingIndex] = data;
        setPendingItems(updatedItems);
        setEditingIndex(-1);
      } else {
        setPendingItems([...pendingItems, data]);
      }
    }

    reset();
  };

  // Function to handle editing an item
  const handleEditItem = (index: number) => {
    setEditingIndex(index);
    const item = pendingItems[index];

    // Set form values for editing
    fields.forEach((field) => {
      if (item[field.name] !== undefined) {
        setValue(field.name, item[field.name]);
      }
    });
  };

  // Function to handle deleting an item
  const handleDeleteItem = (index) => {
    const updatedItems = [...pendingItems];
    updatedItems.splice(index, 1);
    setPendingItems(updatedItems);

    if (editingIndex === index) {
      setEditingIndex(-1);
      reset();
    }
  };

  // Function to handle final submission of all pending items
  const handleFinalSubmit = async () => {
    if (pendingItems.length === 0) {
      showToast("Please add at least one item before submitting", "info");
      return;
    }

    try {
      setIsLoading(true);
      console.log(pendingItems);
      // Use Axios to submit data
      const responses = await Promise.all(
        pendingItems.map((pendingItem) => postData(apiEndpoint, pendingItem))
      );

      // Call the onSubmit callback with response data
      onSubmit(responses);

      // Reset form state
      setPendingItems([]);
      setSelectedItems({});
      setSelectedParent(null);
      reset();
      setIsLoading(false);
    } catch {
      console.error("Error submitting data:");
      showToast("Failed to submit data", "error");
      setIsLoading(false);
    }
  };

  // Helper function to render form fields based on their type
  const renderField = (field: Field) => {
    return (
      <Form.Group className='mb-3' key={field.name}>
        <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue || ""}
          rules={field.validation || { required: field.required }}
          render={({ field: { onChange, value, ref } }) => {
            switch (field.type) {
              case "select":
                return (
                  <Form.Select
                    id={field.name}
                    value={value || ""}
                    onChange={(e) => {
                      if (field.isNumber)
                        return onChange(Number(e.target.value));
                      return onChange(e.target.value);
                    }}
                    ref={ref}
                    isInvalid={!!errors[field.name]}>
                    <option value=''>Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                );
              case "textarea":
                return (
                  <Form.Control
                    as='textarea'
                    id={field.name}
                    value={value || ""}
                    onChange={onChange}
                    ref={ref}
                    isInvalid={!!errors[field.name]}
                    rows={4}
                  />
                );
              default:
                return (
                  <Form.Control
                    type={field.type || "text"}
                    id={field.name}
                    value={value || ""}
                    onChange={onChange}
                    ref={ref}
                    isInvalid={!!errors[field.name]}
                  />
                );
            }
          }}
        />
        {errors[field.name] && (
          <Form.Control.Feedback type='invalid'>
            {errors[field.name].message || `${field.label} is required`}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  };

  // Render form based on type
  return (
    <Card className='m-3'>
      <Card.Header className='bg-primary text-white'>
        <h5 className='mb-0'>{title}</h5>
      </Card.Header>
      <Card.Body>
        {formType === FormType.HIERARCHICAL && (
          <div className='row mb-4'>
            <div className='col-md-4'>
              <Card>
                <Card.Header className='bg-secondary text-white'>
                  Parent Items
                </Card.Header>
                <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <ListGroup>
                    {parentData.map((parent) => (
                      <ListGroup.Item
                        key={parent.id}
                        active={selectedParent?.id === parent.id}
                        action
                        onClick={() => setSelectedParent(parent)}>
                        {parent[parentDisplayField]}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
            <div className='col-md-8'>
              {selectedParent ? (
                <>
                  <h5>Adding for: {selectedParent[parentDisplayField]}</h5>
                  {isLoading && (
                    <div className='text-center my-3'>
                      <div
                        className='spinner-border text-primary'
                        role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </div>
                    </div>
                  )}
                  {/* Form will be rendered below */}
                </>
              ) : (
                <Alert variant='info'>
                  Please select a parent item from the list
                </Alert>
              )}
            </div>
          </div>
        )}

        {formType === FormType.CHECKBOX && (
          <div className='mb-4'>
            <h5>Select Existing Items</h5>
            <Card>
              <Card.Body style={{ maxHeight: "250px", overflowY: "auto" }}>
                {existingData.length > 0 ? (
                  existingData.map((item) => (
                    <Form.Check
                      type='checkbox'
                      id={`check-${item.id}`}
                      key={item.id}
                      label={item.name || item.id}
                      checked={selectedItems[item.id] || false}
                      onChange={() =>
                        setSelectedItems({
                          ...selectedItems,
                          [item.id]: !selectedItems[item.id],
                        })
                      }
                      className='mb-2'
                    />
                  ))
                ) : (
                  <Alert variant='warning'>No existing items available</Alert>
                )}
              </Card.Body>
            </Card>
          </div>
        )}

        {(formType !== FormType.HIERARCHICAL || selectedParent) && (
          <Form onSubmit={handleSubmit(handleAddItem)}>
            <div className='row'>
              {fields.map((field) => (
                <div className='col-md-6' key={field.name}>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className='mt-3 flex'>
              <Button
                type='submit'
                variant='primary'
                className='me-2'
                disabled={isLoading}>
                {editingIndex >= 0 ? "Update Item" : "Add to List"}
              </Button>
              {editingIndex >= 0 && (
                <Button
                  variant='secondary'
                  onClick={() => {
                    setEditingIndex(-1);
                    reset();
                  }}
                  disabled={isLoading}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        )}

        {pendingItems.length > 0 && (
          <div className='mt-4'>
            <h5>Pending Items ({pendingItems.length})</h5>
            <div className='table-responsive'>
              <Table striped bordered hover>
                <thead className='table-dark'>
                  <tr className='text-center'>
                    {fields.map((field) => (
                      <th key={field.name}>{field.label}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingItems.map((item, index) => (
                    <tr key={index} className='text-center'>
                      {fields.map((field) => (
                        <td key={field.name}>{item[field.name]}</td>
                      ))}
                      <td className='flex'>
                        <Button
                          variant='warning'
                          size='sm'
                          className='me-1'
                          onClick={() => handleEditItem(index)}
                          disabled={isLoading}>
                          Edit
                        </Button>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => handleDeleteItem(index)}
                          disabled={isLoading}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Button
              variant='primary'
              className='mt-2'
              onClick={handleFinalSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <span
                    className='spinner-border spinner-border-sm me-2'
                    role='status'
                    aria-hidden='true'></span>
                  Submitting...
                </>
              ) : (
                "Submit All Items"
              )}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CrudForm;
