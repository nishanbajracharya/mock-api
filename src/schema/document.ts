import * as Yup from 'yup';

export const createDocumentSchema = Yup.object().shape({
  displayLabel: Yup.string().trim(),
  fields: Yup.array().of(
    Yup.object().shape({
      type: Yup.string(),
      value: Yup.mixed(),
      label: Yup.string(),
      displayLabel: Yup.string(),
    })
  ),
});