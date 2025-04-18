import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getData, deleteData, updateData } from "../utils/helps";
import { useToast } from "../hook/useToast";
import { FaSearch } from "react-icons/fa";
import type { Column, DataTableProps } from "../types/types";

const DataTable = <T extends { id: number | string }>({
  data,
  setData,
  title,
  columns,
  apiEndpoint,
  refreshTrigger,
  showActions = true,
}: DataTableProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<T>>({});
  const [editingItemId, setEditingItemId] = useState<number | string | null>(
    null
  );
  const itemsPerPage = 5;
  const { showToast } = useToast();

  // Columns to display in table and search
  const visibleColumns = columns.filter((col) => col.visible !== false);

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getData<T[]>(apiEndpoint);
      setData(response);
    } catch {
      showToast("Failed to load data. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint, refreshTrigger]);

  // Delete handler
  const handleDelete = async (item: T) => {
    const nameKey = visibleColumns[0]?.key;
    const label = nameKey ? String(item[nameKey]) : String(item.id);
    if (!window.confirm(`Are you sure you want to delete ${label}?`)) return;
    try {
      await deleteData(`${apiEndpoint}/${item.id}`);
      setData((prev) => prev.filter((d) => d.id !== item.id));
      showToast("Item deleted successfully.", "success");
    } catch {
      showToast("Failed to delete item.", "error");
    }
  };

  // Open edit modal showing all columns
  const openEditModal = (item: T) => {
    setEditingItemId(item.id);
    // Initialize form with all columns, not only visible ones
    const initData: Partial<T> = {};
    columns.forEach((col) => {
      initData[col.key] = item[col.key];
    });
    setEditFormData(initData);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setEditingItemId(null);
    setEditFormData({});
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingItemId == null) return;
    try {
      await updateData(`${apiEndpoint}/${editingItemId}`, editFormData);
      setData((prev) =>
        prev.map((d) =>
          d.id === editingItemId ? ({ ...d, ...editFormData } as T) : d
        )
      );
      showToast("Item updated successfully.", "success");
      closeModal();
    } catch {
      showToast("Failed to update item.", "error");
    }
  };

  // Search & pagination
  const filteredData = data.filter((item) =>
    visibleColumns.some((col) =>
      String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading && data.length === 0) {
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
    <>
      <div className='card mb-4 m-3'>
        <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
          <h5 className='mb-0'>{title}</h5>
        </div>
        <div className='card-body'>
          {/* Search */}
          <div className='row mb-3'>
            <div className='col'>
              <div className='input-group'>
                <input
                  type='text'
                  className='outline-none flex-1 p-2'
                  style={{ border: "1px solid #8888", borderRadius: "5px" }}
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

          {/* Table */}
          {paginatedData.length > 0 ? (
            <>
              <div className='table-responsive'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr className='text-center'>
                      {visibleColumns.map((col) => (
                        <th key={String(col.key)}>{col.label}</th>
                      ))}
                      {showActions && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr key={item.id} className='text-center'>
                        {visibleColumns.map((col) => (
                          <td key={`${item.id}-${String(col.key)}`}>
                            {String(item[col.key])}
                          </td>
                        ))}
                        {showActions && (
                          <td className='flex'>
                            <button
                              className='btn btn-sm btn-warning me-1'
                              onClick={() => openEditModal(item)}>
                              Update
                            </button>
                            <button
                              className='btn btn-sm btn-danger'
                              onClick={() => handleDelete(item)}>
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, i) => (
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
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
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

      {/* Edit Modal: show all columns */}
      {showEditModal && (
        <>
          <div className='modal-backdrop fade show'></div>
          <div className='modal d-block' tabIndex={-1}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Update {title}</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={closeModal}></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={submitEdit}>
                    {columns.map((col) => (
                      <div className='mb-3' key={String(col.key)}>
                        <label className='form-label'>{col.label}</label>
                        <input
                          type='text'
                          className='form-control'
                          name={String(col.key)}
                          value={String(editFormData[col.key] ?? "")}
                          onChange={handleFormChange}
                        />
                      </div>
                    ))}
                    <div className='d-flex justify-content-end'>
                      <button
                        type='button'
                        className='btn btn-secondary me-2'
                        onClick={closeModal}>
                        Cancel
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DataTable;
