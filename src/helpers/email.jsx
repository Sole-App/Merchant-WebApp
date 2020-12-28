import * as EmailValidator from 'email-validator';

function validate(email) {
  return EmailValidator.validate(email);
}

export default {
  validate,
}