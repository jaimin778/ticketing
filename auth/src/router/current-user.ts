import express from 'express';
import { currentUser } from '../middelware/current-user';
import { requireAuth } from '../middelware/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth,(req,res)=> {
    // console.log(req.body);
    res.send({ currentUser: req.currentUser || null || undefined});
});

export { router as currentUserRouter }
