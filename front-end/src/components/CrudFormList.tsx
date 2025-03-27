import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Table,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import { Obj } from "../types/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

interface ListProps {
  label: string;
  data: Obj[];
  dataLabels: string[];
  colLabels: string[];
}

const CrudFormList = ({
  listProps,
  onEditMode,
  deleteHandle,
}: {
  listProps: ListProps;
  onEditMode: (info: Obj) => void;
  deleteHandle: (id: string) => void;
}) => {
  const { label, data, colLabels, dataLabels } = listProps;

  // state
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter based on search term
  const filtered = data?.filter((dept) => {
    const searchLower = searchTerm.toLowerCase();
    return colLabels.some((colLabel) => {
      return (
        dept[colLabel] &&
        JSON.stringify(dept[colLabel]).toLowerCase().includes(searchLower)
      );
    });
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}>
        1
      </Pagination.Item>
    );

    // Add ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(<Pagination.Ellipsis key='ellipsis-1' />);
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(<Pagination.Ellipsis key='ellipsis-2' />);
    }

    // Always show last page if there are more than 1 pages
    if (totalPages > 1) {
      pageNumbers.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Header className='p-3'>
        <Row className='align-items-center'>
          <Col>
            <h3 className='font-bold mb-0'>{label}</h3>
          </Col>
          <Col md={4}>
            <Form.Control
              type='text'
              placeholder='Search departments...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className='text-base'
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className='text-base'>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <div className='table-responsive'>
          <Table striped hover>
            <thead>
              <tr className='flex'>
                {dataLabels.map((colLabel, idx) => (
                  <td key={idx} className='cell text-center flex-1'>
                    {typeof colLabel === "string"
                      ? colLabel.toUpperCase()
                      : colLabel}
                  </td>
                ))}
                <th className='cell text-center flex-2'>ACTIONS</th>
              </tr>
            </thead>
            <tbody className='flex flex-col'>
              {currentItems.length > 0 ? (
                currentItems.map((dept: Obj, idx) => (
                  <tr key={idx} className='flex'>
                    {colLabels.map((colLabel, j) => (
                      <td
                        key={j}
                        className='cell text-center flex-1 roboto-300'>
                        {Array.isArray(dept[colLabel])
                          ? dept[colLabel].join(", ")
                          : dept[colLabel]}
                      </td>
                    ))}
                    <td className='cell flex justify-center flex-2'>
                      <div className='flex space-x-2 justify-center'>
                        <Button
                          variant='outline-primary'
                          size='sm'
                          onClick={() => onEditMode(dept)}>
                          <MdOutlineTipsAndUpdates className='text-xl mx-2' />
                          Edit
                        </Button>
                        <Button
                          variant='outline-danger'
                          size='sm'
                          onClick={() => {
                            deleteHandle(dept[`${colLabels[0]}`]?.toString());
                            if (currentItems.length === 1 && currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                            }
                          }}>
                          <RiDeleteBinLine className='text-xl mx-2' />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='text-center py-3 cell'>
                    {searchTerm ? "No item match your search" : "No item found"}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='d-flex justify-content-between align-items-center flex-wrap mt-3'>
          <p className='text-muted mb-0'>
            Showing {filtered.length ? indexOfFirstItem + 1 : 0} to{" "}
            {Math.min(indexOfLastItem, filtered.length)} of {filtered.length}{" "}
            entries
          </p>

          <Pagination size='sm'>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {renderPageNumbers()}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            />
          </Pagination>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CrudFormList;
