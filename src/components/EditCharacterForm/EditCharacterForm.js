import React from 'react';
import { Formik } from 'formik';
import { Form, Col, Button, Container, Row } from 'react-bootstrap'
import * as yup from 'yup';
import { CLASSES, RACES, DEITIES, BACKGROUNDS, SKILLS, ATTRIBUTES } from '../../data/data';
import './EditCharacterForm.css';

const schema = yup.object({
  name: yup.string().required(),
  race: yup.string().required(),
  strength: yup.number().min(1).max(25),
  dexterity: yup.number().min(1).max(20),
  constitution: yup.number().min(1).max(25),
  intelligence: yup.number().min(1).max(20),
  wisdom: yup.number().min(1).max(20),
  charisma: yup.number().min(1).max(20),
});

const EditCharacterForm = ({ character, onSubmit }) => {
  let selectedClass = CLASSES.filter(charClass => charClass.name === character.charClass)[0];
  const skills = SKILLS.map(skill => character[skill.id]);

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
              athletics: character.athletics,
              acrobatics: character.acrobatics,
              sleightofhand: character.sleightofhand,
              stealth: character.stealth,
              arcana: character.arcana,
              history: character.history,
              investigation: character.investigation,
              nature: character.nature,
              religion: character.religion,
              animalhandling: character.animalhandling,
              insight: character.insight,
              medicine: character.medicine,
              perception: character.perception,
              survival: character.survival,
              deception: character.deception,
              intimidation: character.intimidation,
              performance: character.performance,
              persuasion: character.persuasion,
              skills: skills
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

                        value={
                          values.hp ||
                          selectedClass.hitdie + (Math.round(selectedClass.hitdie / 2) + 1)
                            * (values.level - 1)
                            + Math.floor((values.constitution - 10) / 2) * values.level
                          }
                        type="text"
                        name="hp"
                        onChange={ (e) => {
                            handleChange(e);
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
                <Form.Row>

                    { ATTRIBUTES.map(({ name, short }) => {
                      return (
                          <Form.Group as={ Col } md="2" className="no-gutters" controlId={ `validationFormik${ name }` } key={ name }>
                            <Form.Label>{ short }</Form.Label>
                            <Form.Control
                              value = { values[name.toLowerCase()] }
                              type="text"
                              placeholder="10"
                              name={ name }
                              onChange={ (e) => {
                                  handleChange(e);
                                }}
                              onBlur={ handleBlur }
                              isInvalid={ touched[name.toLowerCase()] && errors[name.toLowerCase()] }
                            />
                            <Form.Control.Feedback type="invalid">
                              { errors[name.toLowerCase()] }
                            </Form.Control.Feedback>
                        </Form.Group>
                        );
                      })
                    }
                </Form.Row>
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

                { values.level >= selectedClass.archLevel &&
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
                }

                  { /* Character Skills */ }
                  <Form.Group controlId="validationFormikSkills">
                    { SKILLS.map(({ name, id }, key) => {
                      return (
                        <Form.Row key={ key }>
                          <Col md="6">
                            <Form.Label>{ name }</Form.Label>
                          </Col>
                          <Col md="3">
                            <Form.Check
                              checked={ values.skills[key] === 1 }
                              type="radio"
                              id={ id }
                              onChange={ () => setFieldValue(`skills[${key}]`, 1) }
                            />
                          </Col>
                          <Col md="3">
                            <Form.Check
                              checked={ values.skills[key] === 2 }
                              type="radio"
                              id={ `${ id }-expertise` }
                              onChange={ () => setFieldValue(`skills[${key}]`, 2) }
                            />
                          </Col>
                        </Form.Row>
                      );
                    })}
                  </Form.Group>

              <Button type="submit" variant="light">Submit</Button>
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
