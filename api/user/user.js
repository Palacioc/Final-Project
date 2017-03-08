var express = require('express');
var router = express.Router();
const User = require('./user.model');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
  .exec((err, Users) => {
    if(err) { return res.send(err); }
    return res.json(Users);
  });
});

/* CREATE a new User. */
router.post('/', (req, res) => {
  const user = new User({
  	username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'Contributor',
    pic: req.body.pic || ''
  });

  user.save((err) => {
    if (err) { return res.send(err); }
    return res.json({ message: 'New user created correctly!' });
  });
});

module.exports = router;
