
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { CREATE_USER } from "../graphql/mutation/user";
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
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    NavLink,
} from "reactstrap";


const Register = () => {
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);
    let initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const formik = useFormik({ initialValues });

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            setErrors([]);
            if (data.createUser.status === false) {
                setErrors(data.createUser.msg);
            } else {
                toast.success("User Registered");
                setTimeout(() => {
                    window.location.href = "/user/login";
                }, 1000);
            }
            setLoader(false);
        },
        onError: (error) => {
            toast.error("Error : " + error.message);
            setLoader(false);
        },
    });

    const handleSignIn = () => {
        setErrors([]);
        createUser({
            variables: {
                userInput: {
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    email: formik.values.email,
                    password: formik.values.password,
                },
            },
        });
        setLoader(true);
    };

    return (
        <>
            <br />
            <Row>
                <Col>
                    <div style={{ margin: "100px" }}>
                        <h1 className="welcome-text">New User</h1>
                        <h1 className="welcome-text">Registration</h1>
                    </div>
                </Col>
                <Col lg="6" md="6">
                    <Card
                        className="bg-secondary shadow border-0"
                        style={{ margin: "90px" }}
                    >
                        <CardHeader className="bg-transparent ">
                            <CardTitle
                                tag="h3"
                                className="d-flex justify-content-center"
                                style={{ color: "white" }}
                            >
                                Register Here
                            </CardTitle>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i
                                                    className="nc-icon nc-single-02"
                                                    style={{ color: "white" }}
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="First Name"
                                            type="text"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    {errors && errors.firstName ? (
                                        <label style={{ color: "red" }}>
                                            {errors.firstName.message}
                                        </label>
                                    ) : null}
                                </FormGroup>

                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i
                                                    className="nc-icon nc-single-02"
                                                    style={{ color: "white" }}
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Last Name"
                                            type="text"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    {errors && errors.lastName ? (
                                        <label style={{ color: "red" }}>
                                            {errors.lastName.message}
                                        </label>
                                    ) : null}
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i
                                                    className="nc-icon nc-lock-circle-open"
                                                    style={{ color: "white" }}
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            autoComplete="new-email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    {errors && errors.email ? (
                                        <label style={{ color: "red" }}>
                                            {errors.email.message}
                                        </label>
                                    ) : null}
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i
                                                    className="nc-icon nc-key-25"
                                                    style={{ color: "white" }}
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-email"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                    </InputGroup>
                                    {errors && errors.password ? (
                                        <label style={{ color: "red" }}>
                                            {errors.password.message}
                                        </label>
                                    ) : null}
                                </FormGroup>

                                <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={handleSignIn}
                                    >
                                        {loader ? ("Loading") : ("Register")}
                                    </Button>
                                    <NavLink href="/login">Click here to Login</NavLink>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Register;
