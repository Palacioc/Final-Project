var express = require('express');
var router = express.Router();
const Project = require('./project.model');

/* GET project listing. */
router.get('/', (req, res, next) => {
  Project.find({})
  .exec((err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

/* CREATE a new Project. */
router.post('/', (req, res) => {
  const project = new Project({
    _creator: req.body.creatorID,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image || '',
    completed: req.body.completed || false,
    location: req.body.location,
  });

  project.save((err) => {
    if (err) { return res.send(err); }
    return res.json({ message: 'New project created correctly!' });
  });
});



module.exports = router;
