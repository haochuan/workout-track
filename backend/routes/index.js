import { Router } from 'express';
import passport from 'passport';
import userRoute from './user';

const router = Router();

router.route('/signup')
  .post(userRoute.create);

router.route('/login')
  .post(userRoute.login);




export default router;
