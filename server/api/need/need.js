var express = require('express');
var router = express.Router();
const Need = require('./need.model');
const mongoose = require('mongoose');

/* GET need listing. */
router.get('/', (req, res, next) => {
  Need.find({})
  .exec((err, Need) => {
    if(err) { return res.send(err); }
    return res.json(Need);
  });
});

/* GET need listing by projectID. */
router.get('/by-project/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Need.find({_project : req.params.id})
  .populate('allocatedProvider')
  .populate('allocatedContributor')
  .exec((err, Needs) => {
    if(err) { return res.send(err); }
    return res.json(Needs);
  });
});

/* CREATE a new Need. */
router.post('/', (req, res) => {
  const need = new Need({
    _project: req.body.projectID,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    status: req.body.status,
    allocatedProvider: req.body.providerID,
    allocatedContributor: req.body.contributorID,
    cost: req.body.cost,
  });

  need.save((err) => {
    if (err) { return res.send(err); }
    return res.json({ message: 'New need created correctly!' });
  });
});

/* GET a single Need. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Need.findById(req.params.id, (err, Needs) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Needs);
    });
});

/* EDIT a Need. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Need.findByIdAndUpdate(req.params.id, { $set : req.body }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Need updated successfully'
    });
  });
});

/* DELETE a Need. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Need.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Need has been removed!'
    });
  });
});


module.exports = router;
