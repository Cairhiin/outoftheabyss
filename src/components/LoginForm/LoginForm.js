import React from 'react';
import './LoginForm.css';
import { Formik } from 'formik';
import { Form, Col, Button, Container, Row, Alert } from 'react-bootstrap'
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
});

const LoginForm = (props) => {
  let { hasError } = props;
  return (
    <Container>
      <Row>
        <Col lg="4">

        </Col>
        <Col lg="4" id="login-form">
          <h2>Login Form</h2>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={ schema }
            onSubmit={ values => props.onSubmit(values) }
          >
            {({
              handleReset,
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors }) => (
              <Form noValidate onSubmit={ handleSubmit }>
                <Form.Row>
                  <Form.Group as={ Col } md="12" controlId="validationFormikUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={ values.username || '' }
                      onChange={ (e) => {
                          handleChange(e);
                          hasError = false;
                        }}
                      onBlur={ handleBlur }
                      isInvalid={ touched.username && errors.username }
                    />
                    <Form.Control.Feedback type="invalid">
                      { errors.username }
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
                        value={ values.password || '' }
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.password && errors.password }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.password }
                      </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={ Col } md="12">
                    <Form.Check
                      name="stayLoggedIn"
                      value={ true }
                      label="I want to stay logged in"
                      onChange= { handleChange }
                      isInvalid={ !!errors.terms }
                      feedback={ errors.terms }
                      type="switch"
                      id="custom-switch"
                    />
                  </Form.Group>
                </Form.Row>
              <Button type="submit" variant="light">Submit</Button>
              { hasError &&
                <Alert variant="danger">
                  Incorrect Login credentials!
                </Alert>
              }
            </Form>
            )}
          </Formik>
        </Col>
        <Col lg="4">

        </Col>
      </Row>
    </Container>
  )
};

export default LoginForm;
