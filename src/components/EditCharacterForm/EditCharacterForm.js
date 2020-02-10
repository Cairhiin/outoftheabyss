import React from 'react';
import { Formik } from 'formik';
import { Form, Col, Button, Container, Row, Alert } from 'react-bootstrap'
import * as yup from 'yup';
import { CLASSES, RACES, DEITIES, BACKGROUNDS } from '../../data/data';
import './EditCharacterForm.css';

const schema = yup.object({
  name: yup.string().required(),
  race: yup.string().required()
});

const EditCharacterForm = ({ character, onSubmit, hasError }) => {
  let selectedClass = CLASSES.filter(charClass => charClass.name === character.charClass)[0];

  return (
    <Container>
      <Row>
        <Col lg="4">

        </Col>
        <Col lg="4" id="login-form">
          <h2>Edit Character Form</h2>
          <Formik
            initialValues = {{
              name: character.charName,
              level: character.level,
              hp: character.hp,
              background: character.background[0].bgName,
              race: character.race[0].raceName,
              charClass: character.charClass,
              deity: character.deity,
              archetype: character.archetype,
              strength: character.strength,
              dexterity: character.dexterity,
              constitution: character.constitution,
              intelligence: character.intelligence,
              wisdom: character.wisdom,
              charisma: character.charisma,
              acrobatics: character.acrobatics
            }}
            validationSchema={ schema }
            onSubmit={ values => onSubmit(values) }
          >
            {({
              handleReset,
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              setFieldValue,
              touched,
              isValid,
              errors }) => (
              <Form noValidate onSubmit={ handleSubmit }>
                <Form.Row>

                  { /* Character Name */ }
                  <Form.Group as={ Col } md="12" controlId="validationFormikName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value = { values.name }
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={ (e) => {
                          handleChange(e);
                          hasError = false;
                        }}
                      onBlur={ handleBlur }
                      isInvalid={ touched.name && errors.name }
                    />
                    <Form.Control.Feedback type="invalid">
                      { errors.name }
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>

                  { /* Character Race */ }
                  <Form.Group as={ Col } md="9" controlId="validationFormikRace">
                    <Form.Label>Race</Form.Label>
                      <Form.Control
                        value = { values.race }
                        as="select"
                        name="race"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.race && errors.race }
                      >
                      { RACES.map((race, key) => {
                          return (
                            <option value={ race } key={ key }>
                              { race }
                            </option>
                          );
                      })}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        { errors.race }
                      </Form.Control.Feedback>
                  </Form.Group>

                  { /* Character Level */ }
                  <Form.Group as={ Col } md="3" controlId="validationFormikLevel">
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      value = { values.level }
                      type="text"
                      placeholder="Level"
                      name="level"
                      onChange={ (e) => {
                          handleChange(e);
                          hasError = false;
                          // reset the assigned hp value so it can be updated
                          setFieldValue('hp', '');
                        }}
                      onBlur={ handleBlur }
                      isInvalid={ touched.level && errors.level }
                    />
                    <Form.Control.Feedback type="invalid">
                      { errors.level }
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>

                  { /* Character Class */ }
                  <Form.Group as={ Col } md="9" controlId="validationFormikClass">
                    <Form.Label>Class</Form.Label>
                      <Form.Control
                        value = { values.charClass }
                        as="select"
                        name="charClass"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                            selectedClass = CLASSES.filter(charClass => charClass.name === e.target.value)[0];
                            // reset the assigned hp value so it can be updated
                            setFieldValue('hp', '');
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.class && errors.class }
                      >
                      { CLASSES.map((charClass, key) => {
                          return (
                            <option value={ charClass.name } key={ key }>
                              { charClass.name }
                            </option>
                          );
                      })}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        { errors.charClass }
                      </Form.Control.Feedback>
                    </Form.Group>

                    { /* Character HP */ }
                    <Form.Group as={ Col } md="3" controlId="validationFormikHP">
                      <Form.Label>Hitpoints</Form.Label>
                      <Form.Control

                        value={ values.hp || selectedClass.hitdie + (Math.round(selectedClass.hitdie / 2) + 1) * (values.level - 1) + Math.floor((values.constitution - 10) / 2) * values.level }
                        type="text"
                        name="hp"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.hp && errors.hp }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.hp }
                      </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                  { /* Character Attributes */ }
                  <Form.Group as={ Row } className="no-gutters" controlId="validationFormikAttributes">
                    <Col md="2">
                      <Form.Label>STR</Form.Label>
                      <Form.Control
                        value = { values.strength }
                        type="text"
                        placeholder="10"
                        name="strength"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.strength && errors.strength }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.strength }
                      </Form.Control.Feedback>
                    </Col>

                    <Col md="2">
                      <Form.Label>DEX</Form.Label>
                      <Form.Control
                        value = { values.dexterity }
                        type="text"
                        placeholder="10"
                        name="dexterity"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.dexterity && errors.dexterity }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.dexterity }
                      </Form.Control.Feedback>
                    </Col>

                    <Col md="2">
                      <Form.Label>CON</Form.Label>
                      <Form.Control
                        value = { values.constitution }
                        type="text"
                        placeholder="10"
                        name="constitution"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                            setFieldValue('hp', '');
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.constitution && errors.constitution }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.constitution }
                      </Form.Control.Feedback>
                    </Col>

                    <Col md="2">
                      <Form.Label>INT</Form.Label>
                      <Form.Control
                        value = { values.intelligence }
                        type="text"
                        placeholder="10"
                        name="intelligence"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.intelligence && errors.intelligence }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.intelligence }
                      </Form.Control.Feedback>
                    </Col>

                    <Col md="2">
                      <Form.Label>WIS</Form.Label>
                      <Form.Control
                        value = { values.wisdom }
                        type="text"
                        placeholder="10"
                        name="wisdom"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.wisdom && errors.wisdom }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.wisdom }
                      </Form.Control.Feedback>
                    </Col>

                    <Col md="2">
                      <Form.Label>CHA</Form.Label>
                      <Form.Control
                        value = { values.charisma }
                        type="text"
                        placeholder="10"
                        name="charisma"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.charisma && errors.charisma }
                      />
                      <Form.Control.Feedback type="invalid">
                        { errors.charisma }
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                <Form.Row>
                  { /* Character Background */ }
                  <Form.Group as={ Col } md="6" controlId="validationFormikBackground">
                    <Form.Label>Background</Form.Label>
                      <Form.Control
                        value = { values.background }
                        as="select"
                        name="archetype"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.background && errors.background }
                      >
                      {
                        BACKGROUNDS.map((background, key) => {
                          return (
                            <option key={ key }>
                              { background.name }
                              </option>
                            );
                        })
                      }
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        { errors.background }
                      </Form.Control.Feedback>
                  </Form.Group>

                  { /* Character Deity */ }
                  <Form.Group as={ Col } md="6" controlId="validationFormikDeity">
                    <Form.Label>Deity</Form.Label>
                      <Form.Control
                        value = { values.deity }
                        as="select"
                        name="deity"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.deity && errors.deity }
                      >
                      {
                        DEITIES.map((deity, key) => {
                          return (
                            <option key={ key }>
                              { deity }
                              </option>
                            );
                        })
                      }
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        { errors.deity }
                      </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>

                  { /* Character Archetype */ }
                  <Form.Group as={ Col } md="12" controlId="validationFormikArchetype">
                    <Form.Label>Archetype</Form.Label>
                      <Form.Control
                        value = { values.archetype }
                        as="select"
                        name="archetype"
                        onChange={ (e) => {
                            handleChange(e);
                            hasError = false;
                          }}
                        onBlur={ handleBlur }
                        isInvalid={ touched.archetype && errors.archetype }
                      >
                      {
                        selectedClass.archetypes.map((archetype, key) => {
                          return (
                            <option key={ key }>
                              { archetype }
                              </option>
                            );
                        })
                      }
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        { errors.archetype }
                      </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                  { /* Character Skills */ }
                  <Form.Group as={ Row } controlId="validationFormikSkills">
                    <Col md="6">
                      <Form.Label>Athletics</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="athletics"
                        checked = { values.athletics }
                        type="checkbox"
                        name="athletics"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("athletics", !values.athletics);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Acrobatics</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="acrobatics"
                        checked = { values.acrobatics }
                        type="checkbox"
                        name="acrobatics"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("acrobatics", !values.acrobatics);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Sleight of Hand</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="sleightofhand"
                        checked = { values.sleightofhand }
                        type="checkbox"
                        name="sleightofhand"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("sleightofhand", !values.sleightofhand);
                            hasError = false;
                          }}
                      />
                    </Col>
                    <Col md="6">
                      <Form.Label>Stealth</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="stealth"
                        checked = { values.stealth }
                        type="checkbox"
                        name="stealth"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("stealth", !values.stealth);
                            hasError = false;
                          }}
                      />
                    </Col>
                    <Col md="6">
                      <Form.Label>Knowledge: Arcana</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="arcana"
                        checked = { values.arcana }
                        type="checkbox"
                        name="arcana"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("arcana", !values.arcana);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Knowledge: History</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="history"
                        checked = { values.history }
                        type="checkbox"
                        name="history"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("history", !values.history);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Investigation</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="investigation"
                        checked = { values.investigation }
                        type="checkbox"
                        name="arcana"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("investigation", !values.investigation);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Knowledge: Nature</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="nature"
                        checked = { values.nature }
                        type="checkbox"
                        name="nature"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("nature", !values.nature);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Knowledge: Religion</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="religion"
                        checked = { values.religion }
                        type="checkbox"
                        name="religion"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("religion", !values.religion);
                            hasError = false;
                          }}
                      />
                    </Col>

                    <Col md="6">
                      <Form.Label>Animal Handling</Form.Label>
                    </Col>
                    <Col md="6">
                      <Form.Check
                        id="animalhandling"
                        checked = { values.animalhandling }
                        type="checkbox"
                        name="animalhandling"
                        onChange={ (e) => {
                            handleChange(e);
                            setFieldValue("animalhandling", !values.animalhandling);
                            hasError = false;
                          }}
                      />
                    </Col>
                  </Form.Group>

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

export default EditCharacterForm;
