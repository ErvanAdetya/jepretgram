'use strict'

const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    try {
      let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
      next()
    } catch (err) {
      res.status(500).json({
        message: `You dont have authentication to access this page, please login to continue.`,
        err
      })
    }
  }
}