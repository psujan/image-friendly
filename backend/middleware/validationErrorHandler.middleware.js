import {validationResult} from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    const groupedErrors = {};
    errors.array().forEach((err) => {
        if (!groupedErrors[err.path]) {
            groupedErrors[err.path] = [];
        }
        groupedErrors[err.path].push(err.msg);
    });
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors:groupedErrors,
            data: null,
            success: false,
            message:"Validation Failed"
        });
    }

    next()
}

export {validateRequest}