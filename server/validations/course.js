import Validator from 'validator';
import isEmpty from 'is-empty';

export const courseValidate = (data) => {
    let errors = {};
    data.courseID = !isEmpty(data.courseID) ? data.courseID : "";
    data.courseName = !isEmpty(data.courseName) ? data.courseName : "";
    data.professorName = !isEmpty(data.professorName) ? data.professorName : "";
    data.credits = !isEmpty(data.credits) ? data.credits.toString() : "";
    data.capacity = !isEmpty(data.capacity) ? data.capacity.toString() : "";


    if (Validator.isEmpty(data.courseID)) {
        errors.courseID = "Course ID field is required";
    } else if (!Validator.isLength(data.courseID, { min: 6, max: 6 })) {
        errors.courseIDInvalid = "course ID must be 6 digits";
    }

    if (Validator.isEmpty(data.courseName)) {
        errors.courseName = "Course Name is required";
    }

    if (Validator.isEmpty(data.professorName)) {
        errors.professorName = "Professor Name is required";
    }

    if (Validator.isEmpty(data.capacity)) {
        errors.capacity = "Capacity is required";
    } else if (!Validator.isNumeric(data.capacity)) {
        errors.capacityInvalid = "Capacity must be a number";
    }

    if (Validator.isEmpty(data.credits)) {
        errors.credits = "Credits is required";
    } else if (!Validator.isNumeric(data.credits)) {
        errors.creditsInvalid = "Credits must be a number";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}