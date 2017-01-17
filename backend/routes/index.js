import { Router } from 'express';
import passport from 'passport';
import userRoute from './user';
import exerciseRoute from './exercise';
import workoutRoute from './workout';

const router = Router();

router.route('/signup')
  .post(userRoute.create);

router.route('/login')
  .post(userRoute.login);

router.route('/api/exercise')
  .post(exerciseRoute.createOne);

router.route('/api/exercise/:exerciseId')
  .get(exerciseRoute.findById)
  .put(exerciseRoute.updateOne)
  .delete(exerciseRoute.deleteOne);

router.route('/api/workout')
  .post(workoutRoute.createOne);

router.route('/api/workout/:workoutId')
  .get(workoutRoute.findById)
  .put(workoutRoute.updateOne)
  .delete(workoutRoute.deleteOne);




export default router;
