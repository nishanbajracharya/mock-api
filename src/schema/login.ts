import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
});
