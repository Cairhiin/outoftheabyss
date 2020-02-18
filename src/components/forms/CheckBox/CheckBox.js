import React from 'react';
import { Field } from "formik";

export default function Checkbox({ id, name, className, onChange }) {
  return (
      <Field name={ name }>
        {({ field, form, setFieldValue }) => {
          console.log(field)
          return (
            <input
              type="checkbox"
              id={id}
              className={ className }
              value={ field.value }
              checked={ field.value }
              { ...field }
              onChange={ onChange }
            />
          );
        }}
      </Field>
  );
}
