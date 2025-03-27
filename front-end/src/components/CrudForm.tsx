import { useState, useCallback, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Card,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { MdOutlineInsertChartOutlined } from "react-icons/md";
import { useForm } from "react-hook-form";
import CrudFormList from "./CrudFormList";
import { CrudFromField, Obj } from "../types/types";
import { getData, postData, updateData, deleteData } from "../utils/helps";
import { useToast } from "../hook/useToast";

const CrudForm = ({
  inputFields,
  url,
  isFilter,
}: {
  inputFields: CrudFromField[];
  url: string;
  isFilter?: boolean;
}) => {
  const [filterText, setFilterText] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Obj[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { showToast } = useToast();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // GET
  const getHandle = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getData(url);
      setData(res);
    } catch {
      showToast("Get Method Fail!", "error");
    } finally {
      setLoading(false);
    }
  }, [url, showToast]);

  // Fetch departments on component mount
  useEffect(() => {
    getHandle();
  }, [getHandle]);

  // CREATE
  const createHandle = useCallback(
    async (info: { [key: string]: string }) => {
      try {
        const res = await postData(url, info);
        setLoading(true);
        setData((prev) => [...prev, res]);
        reset();
        showToast("Create Success!", "success");
      } catch {
        showToast("Create Fail!", "error");
      } finally {
        setLoading(false);
      }
    },
    [reset, url, showToast]
  );

  // UPDATE
  const updateHandle = useCallback(
    async (info: Obj) => {
      try {
        setLoading(true);
        const res = await updateData(url + `/${info.id}`, info);
        setData((prev) => prev.map((obj) => (obj.id === res.id ? res : obj)));
        reset();
        setEditMode(false);
        showToast("Update Success!", "success");
      } catch {
        showToast("Update Fail!", "error");
      } finally {
        setLoading(false);
      }
    },
    [reset, url, showToast]
  );

  // DELETE
  const deleteHandle = useCallback(
    async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this item?")) return;
      try {
        setLoading(true);
        const res = await deleteData(`${url}/${id}`);
        setData((prev) => prev.filter((obj) => obj.id !== res.id));
        showToast("Delete Success!", "success");
      } catch {
        showToast("Delete Fail!", "error");
      } finally {
        setLoading(false);
      }
    },
    [url, showToast]
  );

  const onEditMode = (info: Obj) => {
    setEditMode(true);
    inputFields.forEach((field) => {
      const label = field["key"];
      setValue(label, info[label]);
    });
    formRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = editMode ? updateHandle : createHandle;

  // Filter based on search term
  const filterHandle = (data: Obj[] | undefined, label: string | undefined) => {
    const res = data?.filter((dept: Obj) => {
      const filterTextLowercase = filterText.toLowerCase();
      return (
        dept[label ?? "id"] &&
        JSON.stringify(dept[label ?? "id"])
          .toLowerCase()
          .includes(filterTextLowercase)
      );
    });
    return res;
  };

  return (
    <Container>
      <Card className='mb-5 shadow-sm my-4'>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <Row className='mb-3'>
              {inputFields.map(
                (
                  {
                    key,
                    label,
                    type,
                    isRequired,
                    isDropBox,
                    dataDrop,
                    dropLabel,
                    isMultiple,
                  },
                  idx
                ) => (
                  <Col md={6} key={idx}>
                    <Form.Group className='mb-3'>
                      <Form.Label
                        className='font-bold text-2xl my-4'
                        style={{ display: "flex", alignItems: "center" }}>
                        <MdOutlineInsertChartOutlined className='text-3xl' />
                        {label}
                      </Form.Label>

                      {isDropBox ? (
                        <Row>
                          <Col>
                            <Form.Group>
                              {isMultiple ? (
                                <div
                                  style={{
                                    maxHeight: "110px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    padding: "5px",
                                  }}>
                                  {filterHandle(dataDrop, dropLabel)?.map(
                                    (item) => (
                                      <Form.Check
                                        key={item.id}
                                        type='checkbox'
                                        label={item[`${dropLabel}`]}
                                        value={item.id}
                                        checked={selectedValues.includes(
                                          JSON.stringify(item.id)
                                        )}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const updatedValues =
                                            selectedValues.includes(value)
                                              ? selectedValues.filter(
                                                  (v) => v !== value
                                                ) // Bỏ chọn
                                              : [...selectedValues, value];

                                          setSelectedValues(updatedValues);
                                          setValue(label, updatedValues);
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              ) : (
                                <Form.Select
                                  className='dropdown-custom px-2 py-3 text-base'
                                  {...register(key, {
                                    required: true,
                                    valueAsNumber: type === "number",
                                  })}
                                  onChange={(e) => {
                                    setValue(key, e.target.value);
                                    setFilterText("");
                                  }}>
                                  {filterHandle(dataDrop, dropLabel)?.map(
                                    (item) => (
                                      <option key={item.id} value={item.id}>
                                        {item[`${dropLabel}`]}
                                      </option>
                                    )
                                  )}
                                </Form.Select>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      ) : (
                        <Form.Control
                          readOnly={editMode && idx === 0}
                          type={type}
                          placeholder={`Input ${label}`}
                          className='px-2 py-3 text-base'
                          {...register(key, {
                            required: isRequired,
                            valueAsNumber: type === "number",
                          })}
                        />
                      )}

                      {errors[key] && (
                        <p className='text-danger p-1 font-medium'>
                          {label} is required!
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                )
              )}

              {isFilter && (
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      className='font-bold text-2xl my-4'
                      style={{ display: "flex", alignItems: "center" }}>
                      <MdOutlineInsertChartOutlined className='text-3xl' />
                      Filter
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={`Input Filter`}
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      className='filter-input px-2 py-3 mb-3'
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>

            <div className='flex space-x-2'>
              <Button type='submit' className='btn-custom-primary btn'>
                {editMode ? "Update" : "Submit"}
              </Button>

              {editMode && (
                <Button
                  variant='outline-secondary'
                  className='btn'
                  onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              )}

              <Button
                variant='outline-secondary'
                className='btn'
                onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <CrudFormList
        listProps={{
          label: "Information",
          data,
          dataLabels: inputFields
            .filter((field) => field.label && field.isVisible)
            .map((field) => field.label),
          colLabels: inputFields
            .filter((field) => field.key && field.isVisible)
            .map((field) => field.key),
        }}
        onEditMode={onEditMode}
        deleteHandle={deleteHandle}
      />

      {/* Loading Spinner */}
      {loading && (
        <div className='spinner-overlay'>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-3'>
            <Spinner animation='border' role='status' variant='primary' />
            <span>Processing...</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CrudForm;
