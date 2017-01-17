import User from '../models/User';

const userRoute = {
  create: function(req, res) {
    let user = new User({
      email: req.body.email,
      password: req.body.password
    });

    user.save((err, data) => {
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

  login: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (user) {
          if (user.password === req.body.password) {
            res.status(200).send({
              status: 'SUCCESS',
              data: user
            });
          } else {
            res.status(500).send({
              status: 'ERROR',
              message: 'Incorrect password'
            });
          }
        } else {
          res.status(404).send({
            status: 'NOTFOUND',
            message: 'User Not Found'
          });
        }
      }
    });
  }
}

export default userRoute;