import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { NewNote } from "../../types/note";
import { createNote } from "../../lib/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const initialValues: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onCancel, onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate} = useMutation({
    mutationFn: (noteData: NewNote) => createNote(noteData),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        onSuccess();
      },
    });
  };

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Min 3 characters")
    .max(50, "Max 50 characters"),
  content: Yup.string()
    .max(500, "Max 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}