import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, Form, Button, Table, Alert, ListGroup } from "react-bootstrap";
import { CrudFormProps, Field, FormType } from "../types/types";
import { useToast } from "../hook/useToast";
import { postData, getData } from "../utils/helps";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";

const CrudForm = ({
  formType = FormType.BASIC,
  title,
  fields,
  onSubmit,
  apiEndpoint,
  existingData = [[]],
  parentData = [],
  parentDisplayField = "name",
  childRelationField,
  childApiEndpoint,
  initialValues = {},
  groupLabel = [],
  listData = [[], []],
  listLabels = ["List 1", "List 2"],
  listDisplayField = "name",
  listSearchFields = ["name"],
}: CrudFormProps) => {
  // State for temporary saved items before final submission
  const [pendingItems, setPendingItems] = useState<object[]>([]);
  const [selectedParent, setSelectedParent] = useState<object | null>(null);
  const [childItems, setChildItems] = useState<object[]>([]);
  const [selectedItems, setSelectedItems] = useState<object>({});
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [mainEntity, setMainEntity] = useState<object | null>(null);
  const [selectedLists, setSelectedLists] = useState<object[][]>([[], []]);
  const [searchTerms, setSearchTerms] = useState(["", ""]);
  const [showDropdowns, setShowDropdowns] = useState(false);
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
      getData(`${childApiEndpoint}/${selectedParent?.id}`)
        .then((response) => {
          setChildItems(response);
          setIsLoading(false);
        })
        .catch((err) => {
          showToast(err, "error");
          setIsLoading(false);
        });
    }
  }, [formType, selectedParent, childApiEndpoint]);

  // Function to handle adding an item to the pending list
  const handleAddItem = (data) => {
    // For checkbox form, combine form data with selected items
    if (formType === FormType.CHECKBOX) {
      const selectedKeys = Object.keys(selectedItems).filter(
        (key) => selectedItems[key]
      );
      if (selectedKeys?.length === 0) {
        showToast("Please select at least one item", "info");
        return;
      }
      const flatData = existingData.flat();
      const selectedData = flatData.filter((item) =>
        selectedKeys?.includes(item?.id?.toString())
      );
      const newItems = selectedData?.map((item) => ({
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
        [childRelationField]: selectedParent?.id,
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
    // For COMPOSITE form, save main entity data and show dropdowns
    else if (formType === FormType.COMPOSITE) {
      setMainEntity(data);
      setShowDropdowns(true);
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
  const handleEditItem = (index) => {
    setEditingIndex(index);
    const item = pendingItems[index];

    // Set form values for editing
    fields.forEach((field: Field) => {
      if (item[field?.name] !== undefined) {
        setValue(field.name, item[field.name]);
      }
    });

    // For COMPOSITE form, we need to set up for editing
    if (formType === FormType.COMPOSITE) {
      // Extract and set main entity
      const mainEntityData = {};
      fields?.forEach((field) => {
        mainEntityData[field?.name] = item[field?.name];
      });
      setMainEntity(mainEntityData);

      // Extract and set selected lists
      const newSelectedLists = [[], []];
      listLabels?.forEach((label, idx) => {
        const listKey = label.toLowerCase()?.replace(/\s+/g, "");
        const listIds = item[listKey] || [];

        // Find the corresponding items from the listData
        if (listData[idx] && listIds?.length > 0) {
          const selectedItems = listData[idx].filter((item) =>
            listIds.includes(item?.id)
          );
          newSelectedLists[idx] = selectedItems;
        }
      });

      setSelectedLists(newSelectedLists);
      setShowDropdowns(true);
    }
  };

  // Function to handle deleting an item
  const handleDeleteItem = (index) => {
    const updatedItems = [...pendingItems];
    updatedItems?.splice(index, 1);
    setPendingItems(updatedItems);

    if (editingIndex === index) {
      setEditingIndex(-1);
      reset();
    }
  };

  // New function to handle adding an item to a list in COMPOSITE form
  const handleAddToList = (item, listIndex) => {
    const updatedLists = [...selectedLists];
    // Check if item already exists in the list to avoid duplicates
    if (
      !updatedLists[listIndex].some(
        (existingItem) => existingItem.id === item.id
      )
    ) {
      updatedLists[listIndex] = [...updatedLists[listIndex], item];
      setSelectedLists(updatedLists);
    }
  };

  // New function to handle removing an item from a list in COMPOSITE form
  const handleRemoveFromList = (itemIndex, listIndex) => {
    const updatedLists = [...selectedLists];
    updatedLists[listIndex] = updatedLists[listIndex].filter(
      (_, index) => index !== itemIndex
    );
    setSelectedLists(updatedLists);
  };

  // New function to handle search term changes
  const handleSearchChange = (term, listIndex) => {
    const updatedTerms = [...searchTerms];
    updatedTerms[listIndex] = term;
    setSearchTerms(updatedTerms);
  };

  // New function to filter list items based on search terms
  const getFilteredListItems = (listIndex) => {
    const term = searchTerms[listIndex].toLowerCase();
    if (!term) return listData[listIndex] || [];

    return (listData[listIndex] || [])?.filter((item) => {
      return listSearchFields?.some((field) => {
        const fieldValue = String(item[field] || "")?.toLowerCase();
        return fieldValue?.includes(term);
      });
    });
  };

  // New function to handle saving the COMPOSITE form
  const handleSaveComposite = () => {
    if (!mainEntity) {
      showToast("Please enter general information first", "info");
      return;
    }

    // Create a new item with main entity data and the selected lists
    const newItem = {
      ...mainEntity,
      [listLabels[0]?.toLowerCase().replace(/\s+/g, "")]: selectedLists[0].map(
        (item) => item.id
      ),
      [listLabels[1]?.toLowerCase().replace(/\s+/g, "")]: selectedLists[1].map(
        (item) => item.id
      ),
    };

    if (editingIndex >= 0) {
      const updatedItems = [...pendingItems];
      updatedItems[editingIndex] = newItem;
      setPendingItems(updatedItems);
      setEditingIndex(-1);
    } else {
      setPendingItems([...pendingItems, newItem]);
    }

    // Reset COMPOSITE form state
    setMainEntity(null);
    setSelectedLists([[], []]);
    setSearchTerms(["", ""]);
    setShowDropdowns(false);
  };

  // Function to handle final submission of all pending items
  const handleFinalSubmit = async () => {
    if (pendingItems?.length === 0) {
      showToast("Please add at least one item before submitting", "info");
      return;
    }

    try {
      setIsLoading(true);
      // Use Axios to submit data
      const responses = await Promise.all(
        pendingItems?.map((pendingItem) => postData(apiEndpoint, pendingItem))
      );

      const data = responses?.filter((item) => item !== undefined);

      console.log(data);

      // Call the onSubmit callback with response data
      onSubmit(data);

      // Reset form state
      setPendingItems([]);
      setSelectedItems({});
      setSelectedParent(null);
      setMainEntity(null);
      setSelectedLists([[], []]);
      setSearchTerms(["", ""]);
      setShowDropdowns(false);
      reset();
      setIsLoading(false);
    } catch {
      showToast("Post Data Fail", "error");
      setIsLoading(false);
    }
  };

  // Helper function to render form fields based on their type
  const renderField = (field) => {
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
                    onChange={(e) => {
                      const inputValue =
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value;
                      onChange(inputValue);
                    }}
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

  // New function to render the COMPOSITE form dropdowns and lists
  const renderCompositeListsSection = () => {
    if (!showDropdowns) return null;

    return (
      <div className='mt-4'>
        <div className='row'>
          {[0, 1].map((listIndex) => (
            <div className='col-md-6 mb-3' key={listIndex}>
              <Card>
                <Card.Header className='bg-secondary text-white'>
                  {listLabels[listIndex]}
                </Card.Header>
                <Card.Body>
                  <Form.Group className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder={`Search ${listLabels[listIndex]}...`}
                      value={searchTerms[listIndex]}
                      onChange={(e) =>
                        handleSearchChange(e.target.value, listIndex)
                      }
                      className='text-base'
                    />
                  </Form.Group>

                  <div
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                    className='mb-3'>
                    <ListGroup>
                      {getFilteredListItems(listIndex).map((item) => (
                        <ListGroup.Item
                          key={item.id}
                          action
                          onClick={() => handleAddToList(item, listIndex)}
                          className='d-flex justify-content-between align-items-center'>
                          {item[listDisplayField]}
                          <CiSquarePlus className='text-3xl' />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    {getFilteredListItems(listIndex)?.length === 0 && (
                      <p className='text-center text-muted my-2'>
                        No items found
                      </p>
                    )}
                  </div>

                  <div>
                    <h6>
                      Selected {listLabels[listIndex]} (
                      {selectedLists[listIndex]?.length})
                    </h6>
                    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                      {selectedLists[listIndex]?.length > 0 ? (
                        <Table size='sm' striped bordered>
                          <tbody>
                            {selectedLists[listIndex].map((item, idx) => (
                              <tr key={idx}>
                                <td>{item[listDisplayField]}</td>
                                <td
                                  align='center'
                                  className='text-center'
                                  style={{ width: "60px" }}>
                                  <Button
                                    className='flex justify-between align-middle'
                                    style={{ width: "100%" }}
                                    variant='danger'
                                    size='sm'
                                    onClick={() =>
                                      handleRemoveFromList(idx, listIndex)
                                    }>
                                    <FaTrashAlt className='w-[50px]' />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <p className='text-center text-muted my-2'>
                          No items selected
                        </p>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <div className='d-flex mt-3'>
          <Button
            variant='primary'
            onClick={handleSaveComposite}
            className='me-2'>
            {editingIndex >= 0 ? "Update Item" : "Save"}
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              setMainEntity(null);
              setSelectedLists([[], []]);
              setSearchTerms(["", ""]);
              setShowDropdowns(false);
              setEditingIndex(-1);
              reset();
            }}>
            Cancel
          </Button>
        </div>
      </div>
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
                    {parentData?.map((parent) => (
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
            <Card>
              <Card.Body
                style={{ maxHeight: "250px", overflowY: "auto" }}
                className='flex'>
                {existingData?.length > 0 ? (
                  existingData?.map((group, groupIndex) => (
                    <div key={groupIndex} className='mb-3 flex-1'>
                      <h5 className='px-3 py-1'>{groupLabel[groupIndex]}</h5>
                      {group.map((item) => (
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
                          className='mb-2 ms-3'
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <Alert variant='warning'>No existing items available</Alert>
                )}
              </Card.Body>
            </Card>
          </div>
        )}

        {(formType !== FormType.HIERARCHICAL || selectedParent) &&
          (formType !== FormType.COMPOSITE || !showDropdowns) && (
            <Form onSubmit={handleSubmit(handleAddItem)}>
              <div className='row'>
                {fields?.map((field) => (
                  <div className='col-md-6' key={field.name}>
                    {renderField(field)}
                  </div>
                ))}
              </div>

              <div className='mt-3 d-flex'>
                <Button
                  type='submit'
                  variant='primary'
                  className='me-2'
                  disabled={isLoading}>
                  {editingIndex >= 0
                    ? "Update Item"
                    : formType === FormType.COMPOSITE
                    ? "Next"
                    : "Add to List"}
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

        {formType === FormType.COMPOSITE && renderCompositeListsSection()}

        {pendingItems?.length > 0 && (
          <div className='mt-4'>
            <h5>Pending Items ({pendingItems?.length})</h5>
            <div className='table-responsive'>
              <Table striped bordered hover>
                <thead className='table-dark'>
                  <tr className='text-center'>
                    {fields?.map((field) => (
                      <th key={field.name}>{field.label}</th>
                    ))}
                    {formType === FormType.COMPOSITE &&
                      [0, 1]?.map((listIndex) => (
                        <th key={`list-${listIndex}`}>
                          {listLabels[listIndex]}
                        </th>
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
                      {formType === FormType.COMPOSITE &&
                        [0, 1].map((listIndex) => {
                          const listKey = listLabels[listIndex]
                            .toLowerCase()
                            .replace(/\s+/g, "");
                          const listIds = item[listKey] || [];
                          return (
                            <td key={`list-${listIndex}`}>
                              {listIds?.length} item
                              {listIds?.length !== 1 ? "s" : ""}
                            </td>
                          );
                        })}
                      <td className='d-flex justify-content-center'>
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
