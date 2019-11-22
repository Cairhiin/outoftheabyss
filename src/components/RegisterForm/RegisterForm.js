import React from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button, Container, Row, Alert, InputGroup } from 'react-bootstrap'
import * as yup from 'yup';
import './RegisterForm.css';

const RegisterForm = (props) => {
  let { hasError } = props;
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email('Invalid email address').required(),
      username: yup.string().required(),
      password: yup.string().required()
    }),
    onSubmit: values => props.onSubmit(values)
  });
  return (
  <Container>
    <Row>
      <Col lg="4">

      </Col>
      <Col lg="4" id="register-form">
        <h2>Register Form</h2>
          <Form noValidate onSubmit={ formik.handleSubmit }>
            <Form.Row>
              <Form.Group as={ Col } md="12" controlId="validationFormikUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={ (e) => {
                        formik.handleChange(e);
                        hasError = false;
                      }}
                    onBlur={ formik.handleBlur }
                    value={ formik.values.username }
                    isInvalid={ formik.touched.username && formik.errors.username }
                  />
                  <Form.Control.Feedback type="invalid">
                    { formik.errors.username }
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={ Col } md="12" controlId="validationFormikFirstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={ (e) => {
                      formik.handleChange(e);
                      hasError = false;
                    }}
                  onBlur={ formik.handleBlur }
                  value={ formik.values.firstName }
                  isInvalid={ formik.touched.firstName && formik.errors.firstName }
                />
                <Form.Control.Feedback type="invalid">
                  { formik.errors.firstName }
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={ Col } md="12" controlId="validationFormikLastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={ (e) => {
                      formik.handleChange(e);
                      hasError = false;
                    }}
                  onBlur={ formik.handleBlur }
                  value={ formik.values.lastName }
                  isInvalid={ formik.touched.lastName && formik.errors.lastName }
                />
                <Form.Control.Feedback type="invalid">
                  { formik.errors.lastName }
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={ Col } md="12" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={ (e) => {
                        formik.handleChange(e);
                        hasError = false;
                      }}
                    onBlur={ formik.handleBlur }
                    value={ formik.values.email }
                    isInvalid={ formik.touched.email && formik.errors.email }
                  />
                  <Form.Control.Feedback type="invalid">
                    { formik.errors.email }
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={ Col } md="12" controlId="validationFormik01">
                <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={ (e) => {
                        formik.handleChange(e);
                        hasError = false;
                      }}
                    onBlur={ formik.handleBlur }
                    value={ formik.values.password }
                    isInvalid={ formik.touched.password && formik.errors.password }
                  />
                  <Form.Control.Feedback type="invalid">
                    { formik.errors.password }
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          <Button type="submit" variant="light">Submit</Button>
          { hasError &&
            <Alert variant="danger">
              Could not register that Username!
            </Alert>
          }
        </Form>
      </Col>
      <Col lg="4">

      </Col>
    </Row>
  </Container>
  );
}

export default RegisterForm;
