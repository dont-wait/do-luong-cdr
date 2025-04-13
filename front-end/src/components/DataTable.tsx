import React, { useState, useEffect } from "react";
import { DataTableProps } from "../types/types";
import { getData, deleteData } from "../utils/helps";
import { useToast } from "../hook/useToast";
import { FaSearch } from "react-icons/fa";

const DataTable: React.FC<DataTableProps> = ({
  data,
  setData,
  title,
  columns,
  apiEndpoint,
  refreshTrigger,
  showActions = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const { showToast } = useToast();

  console.log(data);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getData(apiEndpoint);
      setData(response);
      setIsLoading(false);
    } catch {
      showToast("Failed to load data. Please try again.", "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint, refreshTrigger]);

  const filteredData = data?.filter((item) =>
    columns.some(
      (column) =>
        item[column.key] &&
        item[column.key]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${item.department_name}?`
    );
    if (confirmDelete) {
      try {
        await deleteData(`${apiEndpoint}/${item.id}`);
        setData((prevData) => prevData.filter((d) => d.id !== item.id));
        showToast("Item deleted successfully.", "success");
      } catch {
        showToast("Failed to delete item.", "error");
      }
    }
  };

  if (isLoading && data?.length === 0) {
    return (
      <div className='card mb-4'>
        <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
          <h5 className='mb-0'>{title}</h5>
        </div>
        <div className='card-body text-center py-5'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p className='mt-3'>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card mb-4 m-3'>
      <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>{title}</h5>
      </div>
      <div className='card-body'>
        <div className='row mb-3'>
          <div className='col'>
            <div className='input-group'>
              <input
                type='text'
                className='outline-none flex-1 p-2'
                style={{
                  border: "1px solid #8888",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className='bg-primary p-3'>
                <FaSearch className='text-white' />
              </button>
            </div>
          </div>
        </div>

        {paginatedData?.length > 0 ? (
          <>
            <div className='table-responsive'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr className='text-center'>
                    {columns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                    {showActions && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr className='text-center' key={item.id || index}>
                      {columns.map((column) => (
                        <td key={`${item.id}-${column.key}`}>
                          {item[column.key]}
                        </td>
                      ))}
                      {showActions && (
                        <td className='flex'>
                          <button
                            className='btn btn-sm btn-warning me-1'
                            title='Edit'>
                            Update
                          </button>
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => handleDelete(item)}
                            title='Delete'>
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <nav aria-label='Data table pagination'>
                <ul className='pagination justify-content-center'>
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}>
                    <button
                      className='page-link'
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}>
                      <button
                        className='page-link'
                        onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}>
                    <button
                      className='page-link'
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <div className='alert alert-info'>
            {searchTerm
              ? "No results found matching your search."
              : "No data available."}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
