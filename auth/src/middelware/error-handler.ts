import { Request, Response, NextFunction } from "express";
import { CustomeError } from "../error/custome-error";


export const errorHandler = (err:Error ,req: Request, res: Response, next:NextFunction) => {
    if(err instanceof CustomeError){
        // console.log('handaling this error as a request validation error');
        // const formattedErrors = err.errors.map(error => {
        //     return { message: error.msg, field: error.param };
        // });
        return res.status(err.statusCode).send({errors: err.serializeErrors()}); 
    }

    res.status(400).send({ errors: [{ messgae: 'Something went wrong'}]});
};