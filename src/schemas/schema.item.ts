import * as yup from 'yup';

const valid = yup.object().shape({
  title: yup.string().required(),
  image: yup.string().required(),
});

export default valid;
