import { CustomeError } from './custome-error';

export class BadRequestError extends CustomeError {
    statusCode = 400;

    constructor(public message: string = '') {
        super(); // Call super without arguments since CustomError constructor does not expect any.

        // Set the message property
        this.message = message;

        // Ensure proper prototype chain
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
