import React from 'react'
import { Formik, Field, Form } from "formik";
import { Button, TextField, FormControlLabel, Typography, Checkbox } from "@material-ui/core";
import * as yup from "yup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStyles } from './Style';
import { Color } from "../../utils";
import { RadioButton } from '../radioButton/RadioButton';
import { edit } from "../../redux-toolkit";
import { useDispatch } from 'react-redux';
import { Todo } from "../../type";

interface EditTodoProps {
  closeDialog: (val: boolean) => void;
  todo: Todo
}

const validationSchema = yup.object({
  title: yup.string().required().max(100),
  details: yup.string().required().max(1000),
});

export const EditTodoForm = (props: EditTodoProps) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("#FFFFFF");

  return (
    <div className={classes.root}>
      <Typography
        className={classes.date}
        variant="caption"
        display="block"
        gutterBottom
      >
        {new Date().toDateString()}
      </Typography>
      <Formik
        initialValues={{
          title: props.todo.title,
          details: props.todo.details,
          color: props.todo.color,
          date: props.todo.date,
          id: props.todo.id,
          done: props.todo.done
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(edit(data))
          setSubmitting(false);
          props.closeDialog(false);
          console.log(data);

        }}
      >
        {({ values, isSubmitting, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Typography className={classes.title} variant="body1" gutterBottom>
              Todo Title
            </Typography>
            <Field name="title">
              {({ field, meta }: any) => (
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    id="title"
                    name="title"
                    variant="outlined"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className={classes.error}>{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Typography
              className={classes.details}
              variant="body1"
              gutterBottom
            >
              Todo Details
            </Typography>
            <Field name="details">
              {({ field, meta }: any) => (
                <div>
                  <TextareaAutosize
                    name="details"
                    id="details"
                    className={classes.textArea}
                    rowsMin={5}
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className={classes.error}>{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <div className={classes.radioGroup}>
              {Color.map((color) => (
                <div key={color.code}>
                  <FormControlLabel
                    label=""
                    checked={selectedValue === color.value}
                    value={color.value}
                    control={<RadioButton colorback={color.value} />}
                    name="color"
                    onChange={(e) => {
                      e.preventDefault();
                      values.color = color.value;
                      setSelectedValue(color.value);
                    }}
                  />
                </div>
              ))}
            </div>
            <Field name="done">
              {({ field, meta }: any) => (
                <div>
                  <FormControlLabel
                    control={<Checkbox name="done" />}
                    label="Done"
                    {...field}
                    value={values.done}
                    checked={values.done}
                  />
                </div>
              )}
            </Field>

            <div className={classes.buttons}>
              <Button
                className={classes.button}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                update
              </Button>
              <Button
                onClick={() => props.closeDialog(false)}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
