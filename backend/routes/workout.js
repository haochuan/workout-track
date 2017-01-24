import Workout from '../models/Workout';
import mongoose from 'mongoose';

const workoutRoute = {
  createOne: function(req, res) {
    let workout = new Workout({
      name: req.body.name,
      date: req.body.date,
      userId: req.body.userId
    });

    workout.save((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  findById: function(req, res) {
    Workout.findOne({_id: req.params.workoutId}, function(err, workout) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (workout) {
          res.status(200).send(workout);
        } else {
          res.status(404).send({
            status: 'NOTFOUND',
            message: 'Workout Not Found'
          });
        }
      }
    });
  },

  // not in test
  find: function(req, res) {
    const filter = req.query;
    Workout.find(filter, function(err, workout) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (workout) {
          res.status(200).send(workout);
        } else {
          res.status(404).send({
            status: 'NOTFOUND',
            message: 'Workout Not Found'
          });
        }
      }
    });
  },

  findAll: function(req, res) {
    Workout.find({}, function(err, workout) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(workout);
      }
    });
  },

  // findByUser: function(req, res) {
  //   Exercise.find({userId: req.body.userId}, function(err, exercise) {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       if (exercise.length) {
  //         res.status(200).send({
  //           status: 'SUCCESS',
  //           data: exercise
  //         });
  //       } else {
  //         res.status(404).send({
  //           status: 'NOTFOUND',
  //           message: 'Exercise Not Found'
  //         });
  //       }
  //     }
  //   });
  // },

  updateOne: function(req, res) {
    Workout.findOne({_id: req.params.workoutId}, function(err, workout) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (workout) {
          for (let key in req.body) {
            if (workout[key]) {
              workout[key] = req.body[key];
            }
          }
          workout.save((err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send(data);
            }
          });
        } else {
          res.status(404).send({
            status: 'NOTFOUND',
            message: 'Exercise Not Found'
          });
        }
      }
    });
  },

  deleteOne: function(req, res) {
    Workout.remove({_id: req.params.workoutId}, (err, workout) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (workout && workout.result && workout.result.ok === 1 && workout.result.n === 1) {
          res.status(200).send(workout);
        } else {
          res.status(404).send({
            status: 'NOTFOUND',
            message: 'Exercise Not Found'
          });
        }
      }
    })
  }
}

export default workoutRoute;