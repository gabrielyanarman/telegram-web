export const EMAIL_REGEXP = /^.+@.+\..+$/;
export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const ERROR_MESSAGES = {
  firstName: '*Fill the field',
  lastName: '*Fill the field',
  email: '*Invalid email',
  password:
    '*"Password must be at least 8 characters long. Password must contain at least one lowercase letter,one uppercase letter and one digit.',
  copyPassword: '*The passwords is different',
};
