import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import EmployeeDelete from "./EmployeeDelete";
import { EMPLOYEES } from "../../graphql/query/employee";
import no_data from "assets/img/norecordfound.png";
import loader from "assets/img/Loading.gif";
import { toast } from "react-toastify";
import Pagination from "react-pagination-js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "react-pagination-js/dist/styles.css";

function EmployeeView({ setCreateEdit, setEditMode, setEditedEmployee }) {
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const sizePerPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [goBack, setGoBack] = useState(true);
  const [employee, setEmployee] = useState("");
  const [deletedEmployee, setdeletedEmployee] = useState("");
  const {
    data: result,
    loading,
    error,
    fetchMore,
  } = useQuery(EMPLOYEES, {
    fetchPolicy: "cache-and-network",
    variables: { offset: offset - 1, limit: sizePerPage, search: search },
  });
  useEffect(() => {
    if (loading === false) {
      if (error) {
        toast.error("Error : " + error.message);
        console.log(error.message);
      } else {
        setEmployee(result.employees);
      }
    }
  }, [loading, error]);

  // pagination
  const changeCurrentPage = (numPage) => {
    setGoBack(true);
    setOffset(numPage);
    fetchMore({
      variables: {
        offset: numPage,
      },
    });
  };

  // back to previous page-offset if page content length = 0
  if (employee.length === 0) {
    if (goBack) {
      if (offset > 1) {
        setGoBack(false);
        setOffset(offset - 1);
      }
    }
  }

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <InputGroup className="no-border">
                <Input
                  placeholder="Search..."
                  style={
                    employee && employee.length > 0
                      ? {}
                      : search !== ""
                      ? {}
                      : { visibility: "hidden" }
                  }
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    style={
                      employee && employee.length > 0
                        ? {}
                        : search !== ""
                        ? {}
                        : { visibility: "hidden" }
                    }
                  >
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                &nbsp;&nbsp;&nbsp;
                <div className="update ml-auto mr-auto">
                  <Button
                    className="btn-round"
                    color="primary"
                    type="submit"
                    onClick={() => {
                      setCreateEdit(true);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </InputGroup>
            </CardHeader>
            {loading ? (
              <img
                className="ml-auto mr-auto"
                src={loader}
                style={{
                  width: "60px",
                  marginBottom: "100px",
                  marginTop: "50px",
                }}
                alt="react-logo"
              />
            ) : employee && employee.length > 0 ? (
              <>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>#</th>
                        <th>email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {employee.map((empData, index) => (
                        <tr key={index}>
                          <td>{index + (offset - 1) * sizePerPage + 1}</td>
                          <td>{empData.email}</td>
                          <td>{empData.department.name}</td>
                          <td>{empData.designation}</td>
                          <td>
                            <button
                              className="btn-round btn btn-outline-primary btn-sm"
                              color="primary"
                              type="submit"
                              onClick={() => {
                                setEditMode(true);
                                setCreateEdit(true);
                                setEditedEmployee(empData);
                              }}
                            >
                              <i className="fas fa-edit delete-icon"></i>
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                              className="btn-round btn btn-outline-danger btn-sm"
                              color="primary"
                              type="submit"
                              onClick={() => {
                                setShowModal(true);
                                setdeletedEmployee(empData);
                                setGoBack(true);
                              }}
                            >
                              <i className="fas fa-trash delete-icon"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <br />
                  <div className="d-flex justify-content-center">
                    <Pagination
                      currentPage={offset}
                      totalSize={totalRows}
                      sizePerPage={sizePerPage}
                      changeCurrentPage={changeCurrentPage}
                    />
                  </div>
                </CardBody>
              </>
            ) : (
              <img
                src={no_data}
                alt="Nothing Found"
                style={{ width: "400px", margin: "60px" }}
              />
            )}
          </Card>
        </Col>
        {showModal && (
          <EmployeeDelete
            showModal={showModal}
            setShowModal={setShowModal}
            deletedEmployee={deletedEmployee}
          />
        )}
      </Row>
    </>
  );
}

export default EmployeeView;
