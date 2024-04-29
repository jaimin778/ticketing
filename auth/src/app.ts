import express from "express";
import  'express-async-errors';
import { json } from "body-parser"; 
import cookieSession from 'cookie-session';
 
import { currentUserRouter} from './router/current-user';
import { signinRouter } from './router/signin';
import { signoutRouter} from './router/signout';
import { signupRouter} from './router/signup';
import { errorHandler} from './middelware/error-handler';
import { NotFoundError } from "./error/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // Set to false to indicate that the cookie will not be signed
    secure: process.env.NODE_ENV !== 'test' // Set to true if app is served over HTTPS
  })
);


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async ()=>{
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };