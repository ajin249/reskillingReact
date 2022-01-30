import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EMPLOYEE } from "../../graphql/mutation/employee";
import { UPDATE_EMPLOYEE } from "../../graphql/mutation/employee";
import { EMPLOYEES } from "../../graphql/query/employee";
import { DEPARTMENT } from "../../graphql/query/department";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function CreateEdit({ setCreateEdit, editMode, setEditMode, editedEmployee }) {
  const [errors, setErrors] = useState([]);
  const [department, setDepartment] = useState("");
  const [dptId, setDptId] = useState("");
  const [loader, setLoader] = useState(false);
  const { data: result, loading, error, fetchMore } = useQuery(DEPARTMENT);

  useEffect(() => {
    if (loading === false) {
      if (error) {
        toast.error("Error : " + error.message);
        console.log(error.message);
      } else {
        setDepartment(result.departments.departments);
      }
    }
  }, [loading, error]);

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [EMPLOYEES],
    onCompleted: (data) => {
      if (data.createEmployee.status === true) {
        toast.success("Employee Added");
        setCreateEdit(false);
      } else {
        setErrors(data.createEmployee.msg);
      }
      setLoader(false);
    },
    onError: (error) => {
      toast.error("Error : " + error.message);
      console.log(error.message);
      setLoader(false);
    },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [EMPLOYEES],
    onCompleted: (data) => {
      if (data.updateEmployee.status === true) {
        toast.success("Employee Updated");
        setCreateEdit(false);
        setEditMode(false);
      } else {
        setErrors(data.updateEmployee.msg);
      }
      setLoader(false);
    },
    onError: (error) => {
      toast.error("Error : " + error.message);
      console.log(error.message);
      setLoader(false);
    },
  });

  const handleSave = () => {
    if (editMode) {
      updateEmployee({
        variables: {
          empID: editedEmployee.id,
          empInput: {
            //emp_code: formik.values.emp_code,
            email: formik.values.email,
            designation: formik.values.designation,
            departmentId: dptId ? dptId : null,
          },
        },
      });
    } else {
      createEmployee({
        variables: {
          empInput: {
            //emp_code: formik.values.emp_code,
            email: formik.values.email,
            designation: formik.values.designation,
            departmentId: dptId ? dptId : null,
          },
        },
      });
    }
    setLoader(true);
  };

  let initialValues = {};
  if (editMode) {
    initialValues = {
      emp_code: editedEmployee.emp_code,
      department: editedEmployee.department.name,
      designation: editedEmployee.designation,
      email: editedEmployee.email,
    };
  } else {
    initialValues = {
      emp_code: "",
      department: "",
      designation: "",
      email: "",
    };
  }
  const formik = useFormik({ initialValues });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">
                  {editMode ? "Update" : "Add"} Employee
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          placeholder="Email"
                          type="text"
                        />
                        {errors && errors.email ? (
                          <label style={{ color: "red" }}>
                            {errors.email.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Department</label>

                        <select
                          className="form-control"
                          onChange={(e) => {
                            setDptId(parseInt(e.target.value));
                          }}
                        >
                          <option value="">Select Department</option>
                          {department
                            ? department.map((dpt_data) => (
                                <option
                                  key={dpt_data.id}
                                  value={dpt_data.id}
                                  selected={
                                    editedEmployee &&
                                    editedEmployee.department.id === dpt_data.id
                                      ? true
                                      : false
                                  }
                                >
                                  {dpt_data.name}
                                </option>
                              ))
                            : ""}
                        </select>
                        {errors && errors.department_id ? (
                          <label style={{ color: "red" }}>
                            {errors.department_id.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {/*<Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Employee Code</label>
                        <Input
                          type="text"
                          name="emp_code"
                          value={formik.values.emp_code}
                          onChange={formik.handleChange}
                          placeholder="enter Employee code"
                        />
                        {errors && errors.emp_code ? (
                          <label style={{ color: "red" }}>
                            {errors.emp_code.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col> */}

                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Designation</label>
                        <Input
                          type="text"
                          name="designation"
                          value={formik.values.designation}
                          onChange={formik.handleChange}
                          placeholder="Designation"
                        />
                        {errors && errors.designation ? (
                          <label style={{ color: "red" }}>
                            {errors.designation.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={() => {
                          setCreateEdit(false);
                          setEditMode(null);
                        }}
                      >
                        Cancel
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handleSave}
                      >
                        {loader ? "Saving" : "Save"}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateEdit;
