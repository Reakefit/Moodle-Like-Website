import Validator from 'validator';
import isEmpty from 'is-empty';

export const loginValidate = (data) => {
    let errors = {};
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.userId)) {
      errors.userId = "User Id field is required";
    } else if (!Validator.isNumeric(data.userId)) {
      errors.userId = "User Id must be numeric";
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };

}
