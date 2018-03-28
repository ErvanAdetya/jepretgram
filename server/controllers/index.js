const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
  login: (req, res) => {
      User
        .find({ email: req.body.email })
        .then((user) => {
            if(user.length) {
                user = user[0];
                let flag = bcrypt.compareSync(req.body.password, user.password);
                if (flag) {
                    res.status(200).json({
                        status: true,
                        message: `Login successfull`,
                        apptoken: jwt.sign({ id: user._id }, process.env.JWT),
                        user: {
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            } else {
                res.status(200).json({
                    status:false,
                    message: `Email not registered, register to continue`
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Login Error`,
                err
            })
        })
  }
}