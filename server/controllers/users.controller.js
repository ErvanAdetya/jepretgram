const User = require('../models/User')

module.exports = {
  userCreate: (req, res) => {
    new User ({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).save()
      .then((user) => {
        res.status(201).json({
          message:'User successfully created!',
          user
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error creating new user!',
          err
        })
      })
  }
}