import { ERROR_MESSAGES } from '@/app/utils/consts'
import * as Yup from 'yup'

export const LoginSchema = Yup.object({
    email: Yup.string()
        .email('Email must be a valid email')
        .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('Email')),
    password: Yup.string()
        .required(ERROR_MESSAGES.FIELD_IS_REQUIRED('Password'))
})