import Exercise from '../models/Exercise';

const exerciseRoute = {
  createOne: function(req, res) {
    let exercise = new Exercise({
      type: req.body.type,
      name: req.body.name,
      sets: Number(req.body.sets),
      reps: Number(req.body.reps),
      weights: Number(req.body.weights),
      level: 1, // init level is 1
      userId: req.body.userId,
      workoutId: req.body.workoutId
    });

    exercise.save((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({
          status: 'SUCCESS',
          data: data
        });
      }
    });
  },

  findById: function(req, res) {
    Exercise.findOne({_id: req.params.exerciseId}, function(err, exercise) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (exercise) {
          res.status(200).send({
            status: 'SUCCESS',
            data: exercise
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
    Exercise.findOne({_id: req.params.exerciseId}, function(err, exercise) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (exercise) {
          for (let key in req.body) {
            if (exercise[key]) {
              exercise[key] = req.body[key];
            }
          }
          exercise.save((err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send({
                status: 'SUCCESS',
                data: data
              });
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
    Exercise.remove({_id: req.params.exerciseId}, (err, exercise) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({
          status: 'SUCCESS',
          data: exercise
        });
      }
    })
  }
}

export default exerciseRoute;