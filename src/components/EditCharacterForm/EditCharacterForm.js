import React from 'react';
import { Formik } from 'formik';
import { Form, Col, Button, Container, Row } from 'react-bootstrap'
import * as yup from 'yup';
import {
  CLASSES,
  RACES,
  DEITIES,
  BACKGROUNDS,
  SKILLS,
  ATTRIBUTES,
  ALIGNMENT
} from '../../data/data';
import './EditCharacterForm.css';

const schema = yup.object({
  charName: yup.string().required(),
  race: yup.string().required(),
  strength: yup.number().min(1).max(25),
  dexterity: yup.number().min(1).max(20),
  constitution: yup.number().min(1).max(25),
  intelligence: yup.number().min(1).max(20),
  wisdom: yup.number().min(1).max(20),
  charisma: yup.number().min(1).max(20)
});

const calculateHP = (selectedClass, level, con) => {
  return selectedClass.hitdie + (Math.round(selectedClass.hitdie / 2) + 1)
    * (level - 1)
    + Math.floor((con - 10) / 2) * level
};

const EditCharacterForm = ({ character, onSubmit }) => {
  let selectedClass = CLASSES.filter(charClass => charClass.name === character.charClass)[0];
  const {
    _id, charName, level, hp, charClass, alignment, deity, archetype,
    background, race, armour, weapons,
    strength, dexterity, constitution, intelligence, wisdom, charisma,
    athletics, acrobatics, sleightofhand, stealth, arcana, history, investigation,
    nature, religion, animalhandling, insight, medicine, perception, survival,
    deception, intimidation, performance, persuasion
  } = character;

  return (
    <Container>
      <Row>
        <Col lg="4">

        </Col>
        <Col lg="4" id="login-form">
          <h2>Edit Character Form</h2>
          <Formik
            initialValues = {{
              _id: _id,
              charName: charName,
              level: level,
              hp: hp,
              background: background,
              race: race,
              charClass: charClass,
              alignment: alignment,
              deity: deity,
              archetype: archetype,
              strength: strength,
              dexterity: dexterity,
              constitution: constitution,
              intelligence: intelligence,
              wisdom: wisdom,
              charisma: charisma,
              athletics: athletics,
              acrobatics: acrobatics,
              sleightofhand: sleightofhand,
              stealth: stealth,
              arcana: arcana,
              history: history,
              investigation: investigation,
              nature: nature,
              religion: religion,
              animalhandling: animalhandling,
              insight: insight,
              medicine: medicine,
              perception: perception,
              survival: survival,
              deception: deception,
              intimidation: intimidation,
              performance: performance,
              persuasion: persuasion,
              armour: armour,
              weapons: weapons
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
                      value={ values.charName }
                      type="text"
                      placeholder="Name"
                      name="charName"
                      onChange={ (e) => {
                          handleChange(e);
                        }}
                      onBlur={ handleBlur }
                      isInvalid={ touched.charName && errors.charName }
                    />
                    <Form.Control.Feedback type="invalid">
                      { errors.charName }
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
                      type="number"
                      placeholder="Level"
                      name="level"
                      onChange={ (e) => {
                          handleChange(e);
                          // reset the assigned hp value to default value based on avg HP per level
                          setFieldValue('hp', calculateHP(selectedClass, e.target.value, values.constitution));
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
                        value={ values.charClass }
                        as="select"
                        name="charClass"
                        onChange={ (e) => {
                            handleChange(e);
                            selectedClass = CLASSES.filter(charClass => charClass.name === e.target.value)[0];
                            // recalculate character's default HP based on new Class
                            setFieldValue('hp', calculateHP(selectedClass, values.level, values.constitution));
                          }}
                      >
                      { CLASSES.map((charClass, key) => {
                          return (
                            <option value={ charClass.name } key={ key }>
                              { charClass.name }
                            </option>
                          );
                      })}
                      </Form.Control>
                    </Form.Group>

                    { /* Character HP */ }
                    <Form.Group as={ Col } md="3" controlId="validationFormikHP">
                      <Form.Label>Hitpoints</Form.Label>
                      <Form.Control
                        value={ values.hp }
                        type="number"
                        name="hp"
                        onChange={ (e) => {
                            handleChange(e);
                          }}
                        onBlur={ handleBlur }
                      />
                    </Form.Group>
                </Form.Row>

                  { /* Character Attributes */ }
                <Form.Row>

                    { ATTRIBUTES.map(({ name, short }) => {
                      return (
                          <Form.Group as={ Col } md="4" className="no-gutters" controlId={ `validationFormik${ name }` } key={ name }>
                            <Form.Label>{ short }</Form.Label>
                            <Form.Control
                              value = { values[name.toLowerCase()] }
                              type="number"
                              name={ name.toLowerCase() }
                              onChange={ (e) => {
                                  handleChange(e);
                                  if (e.target.name === 'constitution') {
                                    // Update the character's HP based on changed CON score
                                    setFieldValue('hp', calculateHP(selectedClass, values.level, e.target.value));
                                  }
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
                  <Form.Group as={ Col } md="12" controlId="validationFormikBackground">
                    <Form.Label>Background</Form.Label>
                      <Form.Control
                        value = { values.background }
                        as="select"
                        name="background"
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                      >
                      {
                        BACKGROUNDS.map((background, key) => {
                          return (
                            <option value={ background.name } key={ key }>
                              { background.name }
                            </option>
                          );
                        })
                      }
                      </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  { /* Character Deity */ }
                  <Form.Group as={ Col } md="12" controlId="validationFormikDeity">
                    <Form.Label>Deity</Form.Label>
                      <Form.Control
                        value = { values.deity }
                        as="select"
                        name="deity"
                        onChange={ (e) => {
                            handleChange(e);
                          }}
                        onBlur={ handleBlur }
                      >
                      {
                        DEITIES.map((deity, key) => {
                          return (
                            <option value={ deity } key={ key }>
                              { deity }
                              </option>
                            );
                        })
                      }
                      </Form.Control>
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
                              <option value={ archetype } key={ key }>
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

                <Form.Row>
                  { /* Character Alignment */ }
                  <Form.Group as={ Col } md="12" controlId="validationFormikAlignment">
                    <Form.Label>Alignment</Form.Label>
                      <Form.Control
                        value = { values.alignment }
                        as="select"
                        name="alignment"
                        onChange={ (e) => {
                            handleChange(e);
                          }}
                        onBlur={ handleBlur }
                      >
                      {
                        ALIGNMENT.map((alignment, key) => {
                          return (
                            <option value={ alignment } key={ key }>
                              { alignment }
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
                  <Form.Row className="skill__table__header">
                    <Col md="6">
                      <Form.Label>Skills</Form.Label>
                    </Col>
                    <Col md="3">
                      <Form.Label className="centered">Proficiency</Form.Label>
                    </Col>
                    <Col md="3">
                      <Form.Label className="centered">Expertise</Form.Label>
                    </Col>
                  </Form.Row>
                  <Form.Group controlId="validationFormikSkills">
                    { SKILLS.map(({ name, id }, key) => {
                      return (
                        <Form.Row key={ key }>
                          <Col md="6">
                            <Form.Label>{ name }</Form.Label>
                          </Col>
                          <Col md="3" className="centered">
                            <Form.Check
                              checked={ values[id] === 1 }
                              type="radio"
                              id={ id }
                              onChange={ () => setFieldValue(id, 1) }
                            />
                          </Col>
                          <Col md="3" className="centered">
                            <Form.Check
                              checked={ values[id] === 2 }
                              type="radio"
                              id={ `${ id }-expertise` }
                              onChange={ () => setFieldValue(id, 2) }
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
