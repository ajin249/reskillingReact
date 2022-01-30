import React from "react";

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
import { useFormik } from "formik";

import { useMutation } from "@apollo/client";
import { CREATE_DEPARTMENT } from "../../graphql/mutation/department";
import { UPDATE_DEPARTMENT } from "../../graphql/mutation/department";
import { DEPARTMENT } from "../../graphql/query/department";
import { toast } from "react-toastify";
import { useState } from "react";

function User({ setCreateEdit, editMode, setEditMode, editedDepartment }) {
  const [errors, setErrors] = useState([]);
  const [createDepartment] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [DEPARTMENT],
    onCompleted: (data) => {
      if (data.createDepartment.status === true) {
        toast.success("Department created");
        setCreateEdit(false);
      } else {
        setErrors(data.createDepartment.msg);
      }
    },
    onError: (error) => {
      toast.error("Error : " + error.message);
      console.log(error.message);
    },
  });

  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [DEPARTMENT],
    onCompleted: (data) => {
      if (data.updateDepartment.status === true) {
        toast.success("Department updated");
        setCreateEdit(false);
        setEditMode(false);
      } else {
        setErrors(data.updateDepartment.msg);
      }
    },
    onError: (error) => {
      toast.error("Error : " + error.message);
      console.log(error.message);
    },
  });

  const handleSave = () => {
    if (editMode) {
      updateDepartment({
        variables: {
          updateDepartmentId: editedDepartment.id,
          departmentInput: {
            //  code: formik.values.code,
            name: formik.values.name,
            description: formik.values.description,
          },
        },
      });
    } else {
      createDepartment({
        variables: {
          departmentInput: {
            //  code: formik.values.code,
            name: formik.values.name,
            description: formik.values.description,
          },
        },
      });
    }
  };

  let initialValues = {};
  if (editMode) {
    initialValues = {
      code: editedDepartment.code,
      name: editedDepartment.name,
      description: editedDepartment.description,
    };
  } else {
    initialValues = {
      code: "",
      name: "",
      description: "",
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
                  {editMode ? "Update" : "Add"} DepartMent
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    {/* <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>Department Code</label>
                                                <Input
                                                    type="text"
                                                    name='code'
                                                    value={formik.values.code}
                                                    onChange={formik.handleChange}
                                                    placeholder="enter department code"
                                                />
                                                {errors && errors.code ? <label style={{ color: "red" }}>{errors.code.message}</label> : null}
                                            </FormGroup> 
                                        </Col> */}
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Department Name</label>
                        <Input
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          placeholder="enter department name"
                          type="text"
                        />
                        {errors && errors.name ? (
                          <label style={{ color: "red" }}>
                            {errors.name.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          type="textarea"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          placeholder="enter department discription"
                        />
                        {errors && errors.description ? (
                          <label style={{ color: "red" }}>
                            {errors.description.message}
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
                        Save
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

export default User;
