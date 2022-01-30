import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { USER_SIGN_IN } from "../graphql/mutation/login";
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

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    let initialValues = {
        email: "",
        password: "",
    };

    const formik = useFormik({ initialValues });

    const [DoLogin] = useMutation(USER_SIGN_IN, {
        onCompleted: (data) => {
            setErrors([]);
            if (data.doLogin.status === false) {
                setErrors(data.doLogin.message);
            } else {
                console.log(data.doLogin.token)
                var userData = {
                    user: data.doLogin,
                    token: data.doLogin.token,
                };
                localStorage.setItem("userData", JSON.stringify(userData));
                localStorage.setItem("token", data.doLogin.token);
                toast.success("User: Successfully Logged In");

                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
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
        DoLogin({
            variables: {
                email: formik.values.email,
                password: formik.values.password,
            },
        });
        setLoader(true);
    };

    return (
        <>
            <br />
            <Row>
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
                                Login Here
                            </CardTitle>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">
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
                                <FormGroup>
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
                                            autoComplete="new-password"
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
                                        {loader ? (
                                            "Checking"
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button href="/user/register">Register</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <div style={{ margin: "100px" }}>
                        <h1 className="welcome-text">Welcome Back</h1>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Login;
