import Tracker from '../models/Tracker';

const trackerRoute = {
  createOne: function(req, res) {
    let tracker = new Tracker({
      setOrder: req.body.setOrder,
      sets: Number(req.body.sets),
      reps: Number(req.body.reps),
      weights: Number(req.body.weights),
      level: 1, // init level is 1
      userId: req.body.userId,
      exerciseId: req.body.exerciseId
    });

    tracker.save((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  findById: function(req, res) {
    Tracker.findOne({_id: req.params.trackerId}, function(err, tracker) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (tracker) {
          res.status(200).send(tracker);
        } else {
          res.status(404).send({
            status: 'NOTFOUND',
            message: 'Exercise Not Found'
          });
        }
      }
    });
  },

  findAll: function(req, res) {
    Tracker.find({}, function(err, tracker) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(tracker);
      }
    });
  },

  updateOne: function(req, res) {
    Tracker.findOne({_id: req.params.trackerId}, function(err, tracker) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (tracker) {
          for (let key in req.body) {
            if (tracker[key]) {
              tracker[key] = req.body[key];
            }
          }
          tracker.save((err, data) => {
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
    Tracker.remove({_id: req.params.trackerId}, (err, tracker) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (tracker && tracker.result && tracker.result.ok === 1 && tracker.result.n === 1) {
          res.status(200).send(tracker);
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

export default trackerRoute;