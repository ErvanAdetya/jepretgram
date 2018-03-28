var express = require('express');
var router = express.Router();
const {userCreate} = require('../controllers/users.controller')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/', userCreate)

module.exports = router;
