export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ERROR_MESSAGES = {
  FIELD_MAX_ERROR_MESSAGE: (field, max) => {
    return `${field} should have maximum ${max} characters.`;
  },
  FIELD_MIN_ERROR_MESSAGE: (field, min) => {
    return `${field} should have at least ${min} characters.`;
  },
  FIELD_IS_REQUIRED: (field) => {
    return `${field} is required.`;
  },
  PASSWORD_MATCH_ERROR: 'Passwords do not match',
};