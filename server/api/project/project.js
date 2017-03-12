var express = require('express');
var router = express.Router();
const Project = require('./project.model');
const mongoose = require('mongoose');

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

/* GET a single Project. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Project.findById(req.params.id)
  .populate('_creator')
  .exec((err, Projects) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Projects);
    });
});

/* EDIT a Project. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Project.findByIdAndUpdate(req.params.id, { $set : req.body }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Project updated successfully'
    });
  });
});

/* DELETE a Project. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Project.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Project has been removed!'
    });
  });
});



module.exports = router;
