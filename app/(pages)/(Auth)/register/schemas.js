import { EMAIL_REGEXP, ERROR_MESSAGES } from '@/app/utils/consts';
import * as Yup from 'yup'

export const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, ERROR_MESSAGES.FIELD_MIN_ERROR_MESSAGE('First Name', 2))
    .max(10, ERROR_MESSAGES.FIELD_MAX_ERROR_MESSAGE('First Name', 10))
    .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('First Name')),
  lastName: Yup.string()
    .min(2, ERROR_MESSAGES.FIELD_MIN_ERROR_MESSAGE('Last Name', 2))
    .max(25, ERROR_MESSAGES.FIELD_MAX_ERROR_MESSAGE('Last Name', 25))
    .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('Last Name')),
  email: Yup.string()
    .email()
    .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('Email'))
    .matches(EMAIL_REGEXP, 'Email must be a valid email'),
  password: Yup.string()
    .min(6, ERROR_MESSAGES.FIELD_MIN_ERROR_MESSAGE('Password', 6))
    .max(50, ERROR_MESSAGES.FIELD_MAX_ERROR_MESSAGE('Password, 50'))
    .matches(/[0-9]/, 'Password must contain at least one numeric digit.')
    .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('Password')),
  copyPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], ERROR_MESSAGES.PASSWORD_MATCH_ERROR)
    .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('Confirm Password')),
  image: Yup.mixed().nullable(),
});