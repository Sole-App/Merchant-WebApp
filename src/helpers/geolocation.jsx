import * as EmailValidator from 'email-validator';

function validate(email) {
  return EmailValidator.validate(email);
}

latitudeValidation = (value) => {
    const regExp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
    return regExp.test(value);       
 }

export default {
  validate,
}