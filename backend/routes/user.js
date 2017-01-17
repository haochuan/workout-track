import User from '../models/User';

const userRoute = {
  create: function(req, res) {
    let user = new User({
      email: req.body.email,
      password: req.body.password
    });

    user.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  }
}

export default userRoute;