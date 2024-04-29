// import { Request, Response, NextFunction} from 'express';
// import jwt from 'jsonwebtoken';

// interface userPayload {
//     email: string,
//     password: String
// };

// declare global {
//     namespace Express{
//         interface Request {
//             currentUser? : userPayload
//         }
//     }
// }

// export const currentUser = (req: Request,res: Response,next : NextFunction) => {
//     if(!req.session || !req.session.jwt){
//         return next();
//     }

//     try {
//         const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as userPayload;
//         req.currentUser = payload;
//     }catch(err){}

//     next();
// }


// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    email: string,
    password: string
};

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (err) {
        console.error('JWT verification error:', err);
        // Optionally, you can clear the session and handle unauthorized access
        // delete req.session.jwt;
        // return res.status(401).send('Unauthorized');
    }

    next();
};
