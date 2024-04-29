import { CustomeError } from "./custome-error";

export class DatabaseConnectionError extends CustomeError {
    statusCode = 500;
    reason = "Error connecting to the database";

    constructor() {
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
