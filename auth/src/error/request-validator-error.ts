import { ValidationError } from "express-validator";
import { CustomeError } from "./custome-error";

export class RequestValidationError extends CustomeError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super();

        // only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {message : err.msg};
        });
    }
}
