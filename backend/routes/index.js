import { Router } from 'express';
import passport from 'passport';
import userRoute from './user';

const router = Router();

// router.route('/api/users')
//   .post(userRoute.create);

router.post('/login', (req, res, next) => {
  passport.authenticate('local-signin', { successRedirect: '/good',
                                       failureRedirect: '/bad',
                                       failureFlash: false })(req, res, next);
  });

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local-signup', { successRedirect: '/good',
                                       failureRedirect: '/bad',
                                       failureFlash: false })(req, res, next);
  });



export default router;
