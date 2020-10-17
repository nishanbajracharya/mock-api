import * as Yup from 'yup';

export const createColllectionSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  route: Yup.string().trim().required('Required').matches(/^\/[a-z-]+$/i, {
    message: 'Invalid route',
  }),
});