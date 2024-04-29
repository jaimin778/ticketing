import express, {Request,Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../service/password';
import { BadRequestError } from '../error/bad-request-error';
import { User } from '../model/user';
import { validateRequest } from '../middelware/validate-request';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('email must be validate'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('you must be supply a password')
],validateRequest,
async (req: Request,res: Response) => {
    const { email, password} = req.body;

    const existingUser = await User.findOne({ email });
    
    if(!existingUser){
        throw new BadRequestError('Invalid credtial');
    }    

    const passwordMatch = await Password.compare(existingUser.password, password);
    
    if (!passwordMatch) {
        throw new BadRequestError('Invalid credential');
    }

    const useraJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!
    );

    req.session = {
        jwt :useraJwt
    }
    res.send(existingUser);
});

export { router as signinRouter }
