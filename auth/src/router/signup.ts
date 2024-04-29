import express, {Request,Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middelware/validate-request';
import { User } from '../model/user';
import { BadRequestError } from '../error/bad-request-error';


const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .trim()
        .isLength({ min:4, max: 20})
        .withMessage('Password must be 4 to 20 character')
    ], validateRequest,
    async (req:Request,res:Response) => {
    const { email , password } = req.body;
  

    // checking user alredy exists or not
    const existUser = await User.findOne({email});
    if(existUser){
        // console.log('email is use already');
        // return res.send({});
        throw new BadRequestError('Email is Use');
    }

    // creating new user 
    const user = User.build({email, password});
    await user.save();

    //generate jwt token
    
    const userJwt = jwt.sign(
        {
        id: user.id,
        email: user.email
        }, 
        process.env.JWT_KEY!
    );

    //store it on the session
    req.session = {
        jwt: userJwt
    };
    
//     The JWT token is generated using jwt.sign() with the user's id and email.
// The token is then stored in the jwt property of req.session.
// Ensure that you're using the correct secret key for signing the JWT token. Replace 'asdf' with your actual secret key.
// Make sure to handle the req.session object properly in subsequent requests to retrieve and use the JWT token stored in the session.


    res.status(201).send(user);
    // console.log('Creating a user...');
    // // throw new Error('error connecting to database');
    // throw new DatabaseConnectionError();

    // res.send({});   
    // if(!email || typeof email == "string"){
    //     res.status(400).send("please enter valid email");
    // }
});

export { router as signupRouter }
