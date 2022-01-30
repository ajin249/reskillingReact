import React from "react";

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

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DepartmentDelete from "./DepartmentDelete";
import { DEPARTMENT } from "../../graphql/query/department";
import no_data from "assets/img/norecordfound.png";
import { toast } from "react-toastify";
import loader from "assets/img/Loading.gif";

function DepartmentView({ setCreateEdit, setEditMode, setEditedDepartment }) {
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const sizePerPage = 6;
  const [goBack, setGoBack] = useState(true);
  const [Department, setDepartment] = useState("");
  const [deletedDepartment, setdeletedDepartment] = useState("");
  const {
    data: result,
    loading,
    error,
    fetchMore,
  } = useQuery(DEPARTMENT, {
    fetchPolicy: "cache-and-network",
    variables: { offset: offset - 1, limit: sizePerPage, search: search },
  });

  useEffect(() => {
    if (loading === false) {
      if (error) {
        toast.error("Error : " + error.message);
        console.log(error.message);
      } else {
        //console.log(result.departmentList.departments)
        setDepartment(result.departments.departments);
      }
    }
  }, [loading, error]);

  const loadNext = () => {
    if (
      offset * sizePerPage <
      Object.keys(result.departments.departments).length
    ) {
      setOffset(offset + 1);
      fetchMore({
        variables: {
          offset: offset,
        },
      });
    }
  };

  const loadPrev = () => {
    if (offset > 1) {
      var newOffset = offset - 1;
      setOffset(newOffset);
      fetchMore({
        variables: {
          offset: newOffset - 1,
        },
      });
    }
  };

  // back to previous page-offset if page content length = 0
  if (Department.length === 0) {
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
                    Department && Department.length > 0
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
                      Department && Department.length > 0
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
            ) : Department && Department.length > 0 ? (
              <>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>No</th>
                        <th>DPT Code</th>
                        <th>Name</th>
                        <th>description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Department.map((dptData, index) => (
                        <tr key={index}>
                          <td>{index + (offset - 1) * sizePerPage + 1}</td>
                          <td>{dptData.id}</td>
                          <td>{dptData.name}</td>
                          <td>{dptData.description}</td>
                          <td>
                            <button
                              className="btn-round btn btn-outline-primary btn-sm"
                              color="primary"
                              type="submit"
                              onClick={() => {
                                setEditMode(true);
                                setCreateEdit(true);
                                setEditedDepartment(dptData);
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
                                setdeletedDepartment(dptData);
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
                  <div
                    className="update ml-auto mr-auto"
                    style={{ align: "center" }}
                  >
                    <Button
                      style={{ float: "left", "margin-left": "200px" }}
                      className="btn-round"
                      color="primary"
                      type="button"
                      onClick={loadPrev}
                    >
                      Prev
                    </Button>
                    <Button
                      style={{ float: "right", "margin-right": "200px" }}
                      className="btn-round"
                      color="primary"
                      type="button"
                      onClick={loadNext}
                    >
                      Next
                    </Button>
                  </div>
                </CardBody>
              </>
            ) : (
              <img
                src={no_data}
                alt="react-logo"
                style={{ width: "400px", margin: "60px" }}
              />
            )}
          </Card>
        </Col>
        {showModal && (
          <DepartmentDelete
            showModal={showModal}
            setShowModal={setShowModal}
            deletedDepartment={deletedDepartment}
          />
        )}
      </Row>
    </>
  );
}

export default DepartmentView;
