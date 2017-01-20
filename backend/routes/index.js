import { Router } from 'express';
import passport from 'passport';
import userRoute from './user';
import exerciseRoute from './exercise';
import workoutRoute from './workout';
import trackerRoute from './tracker';

const router = Router();

router.route('/signup')
  .post(userRoute.create);

router.route('/login')
  .post(userRoute.login);

router.route('/exercise')
  .get(exerciseRoute.findAll)
  .post(exerciseRoute.createOne);

router.route('/exercise/:exerciseId')
  .get(exerciseRoute.findById)
  .put(exerciseRoute.updateOne)
  .delete(exerciseRoute.deleteOne);

router.route('/workout')
  .get(workoutRoute.findAll)
  .post(workoutRoute.createOne);

router.route('/workout/:workoutId')
  .get(workoutRoute.findById)
  .put(workoutRoute.updateOne)
  .delete(workoutRoute.deleteOne);

  router.route('/tracker')
  .get(trackerRoute.findAll)
  .post(trackerRoute.createOne);

router.route('/tracker/:trackerId')
  .get(trackerRoute.findById)
  .put(trackerRoute.updateOne)
  .delete(trackerRoute.deleteOne);


export default router;
