import Validator from 'validator';
import isEmpty from 'is-empty';

export const userValidate = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.userId = !isEmpty(data.userId) ? data.userId : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.ConfirmPassword = !isEmpty(data.ConfirmPassword) ? data.ConfirmPassword : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.userId)) {
      errors.userId = "userId field is required";
    } else if (!Validator.isNumeric(data.userId)) {
      errors.userId = "userId is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.ConfirmPassword)) {
        errors.ConfirmPassword = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.ConfirmPassword)) {
        errors.ConfirmPassword = "Passwords must match";
    }

    return ({
        errors,
        isValid: isEmpty(errors)
    });

}
