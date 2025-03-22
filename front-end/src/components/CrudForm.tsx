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
import { CrudFromField, ErrorResponse, Obj } from "../types/types";
import { useToast } from "../hook/useToast";
import axios from "../api/axios";
import { isAxiosError } from "axios";

const CrudForm = ({
  inputFields,
  url,
}: {
  inputFields: CrudFromField[];
  url: string;
}) => {
  const [filterText, setFilterText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Obj[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    console.log("get");
    try {
      const response = await axios.get(url);
      if (response.data.statusCode === 200) setData(response.data.data);
      else throw new Error("Failed to fetch data.");
    } catch {
      showToast("Failed to fetch data!", "error");
    } finally {
      setLoading(false);
    }
  }, [url, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle API Errors
  const handleApiError = (err: unknown, defaultMessage: string) => {
    if (isAxiosError(err)) {
      const errorMessage =
        (err.response?.data as ErrorResponse)?.details?.message || err.message;
      if (Array.isArray(errorMessage))
        errorMessage.forEach((msg) => showToast(msg, "error"));
      else showToast(errorMessage, "error");
    } else {
      showToast(defaultMessage, "error");
    }
  };

  // Create or Update Data
  const handleFormSubmit = async (info: Obj) => {
    setLoading(true);
    console.log(info);
    try {
      if (editMode) {
        const label = inputFields.map((field) => field.key)[0];
        const res = await axios.patch(`${url}/${info[label]}`, info);
        setData((prev) =>
          prev.map((obj) => (obj.id === res.data.id ? res.data : obj))
        );
        showToast("Update successful!", "success");
      } else {
        const res = await axios.post(url, info);
        setData((prev) => [...prev, res.data.data]);
        showToast("Create successful!", "success");
      }
      reset();
      setEditMode(false);
    } catch (err) {
      handleApiError(err, editMode ? "Update failed!" : "Creation failed!");
    } finally {
      setLoading(false);
    }
  };

  // Delete Data
  const deleteHandle = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      const res = await axios.delete(`${url}/${id}`);
      setData((prev) =>
        prev.filter((obj) => {
          return JSON.stringify(obj) != JSON.stringify(res.data.data);
        })
      );
      showToast("Delete successful!", "success");
    } catch {
      showToast("Delete failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Enter Edit Mode
  const onEditMode = (info: Obj) => {
    setEditMode(true);
    inputFields.forEach((field) => setValue(field.key, info[field.key]));
    formRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter Data
  const filterData = (data: Obj[], label: string) =>
    data.filter((item) =>
      JSON.stringify(item[label] ?? "")
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );

  return (
    <Container>
      <Card className='mb-5 shadow-sm my-4'>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)} ref={formRef}>
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
                      <Form.Label className='font-bold text-2xl my-4 d-flex align-items-center'>
                        <MdOutlineInsertChartOutlined className='text-3xl me-2' />
                        {label}
                      </Form.Label>

                      {isDropBox ? (
                        <Form.Group>
                          {isMultiple ? (
                            <div className='multi-select-box'>
                              {filterData(dataDrop ?? [], dropLabel ?? "").map(
                                (item, j) => (
                                  <Form.Check
                                    key={j}
                                    type='checkbox'
                                    label={item[dropLabel ?? ""]}
                                    value={item.id}
                                    checked={selectedValues.includes(
                                      String(item.id)
                                    )}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setSelectedValues((prev) =>
                                        prev.includes(value)
                                          ? prev.filter((v) => v !== value)
                                          : [...prev, value]
                                      );
                                      setValue(label, selectedValues);
                                    }}
                                  />
                                )
                              )}
                            </div>
                          ) : (
                            <Form.Select
                              className='dropdown-custom px-2 py-3 text-base'
                              {...register(key, {
                                required: isRequired,
                                valueAsNumber: type === "number",
                              })}>
                              <option value='-1'>Select {label}</option>
                              {filterData(dataDrop ?? [], dropLabel ?? "").map(
                                (item, j) => (
                                  <option
                                    key={j}
                                    value={key === dropLabel ? j : item[key]}>
                                    {item[dropLabel ?? ""]}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          )}
                        </Form.Group>
                      ) : (
                        <Form.Control
                          readOnly={editMode && idx === 0}
                          type={type}
                          placeholder={`Enter ${label}`}
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

              <Col md={6}>
                <Form.Group>
                  <Form.Label className='font-bold text-2xl my-4 d-flex align-items-center'>
                    <MdOutlineInsertChartOutlined className='text-3xl me-2' />
                    Filter
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter filter text'
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className='filter-input px-2 py-3 mb-3'
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className='d-flex gap-2'>
              <Button type='submit' className='btn-custom-primary'>
                {editMode ? "Update" : "Submit"}
              </Button>
              {editMode && (
                <Button
                  variant='outline-secondary'
                  onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              )}
              <Button variant='outline-secondary' onClick={() => reset()}>
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
          colLabels: inputFields
            .filter((field) => field.key && field.isVisible)
            .map((field) => field.key),
        }}
        onEditMode={onEditMode}
        deleteHandle={deleteHandle}
      />

      {loading && (
        <div className='spinner-overlay'>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow d-flex align-items-center'>
            <Spinner animation='border' role='status' variant='primary' />
            <span>Processing...</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CrudForm;
