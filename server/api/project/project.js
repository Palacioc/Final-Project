var express = require('express');
var router = express.Router();
const Project = require('./project.model');
const mongoose = require('mongoose');
const upload = require('../../configs/multer');

/* GET project listing. */
router.get('/', (req, res, next) => {
  Project.find({})
  .exec((err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/by-creator/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Project.find({_creator : req.params.id}, (err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.post('/nearby-projects', (req, res, next) => {
  Project.find({location: {
    $near : { $geometry : { type : "Point", coordinates : [req.body.longitude, req.body.latitude] }, $maxDistance : '10000' }}},
    (err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/search/:term', (req, res, next) => {
  if((req.params.term)==='') {
    return res.status(400).json({ message: 'No search term' });
  }
  Project.find({ "name": { "$regex": req.params.term, "$options": "i" } }, (err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/by-tag/:tag', (req, res, next) => {
  if((req.params.tag)==='') {
    return res.status(400).json({ message: 'No tag received' });
  }
  var query = {};
  query[req.params.tag] = true;
  Project.find( query )
    .sort({'updated_at': -1})
    .limit(2)
    .exec((err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/four-latest', (req, res, next) => {
  Project.find({})
  .sort({'updated_at': -1})
  .limit(4)
  .exec((err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});


/* CREATE a new Project. */
router.post('/', upload.single('file'), (req, res) => {
  let location = {
    type: 'Point',
    coordinates: [req.body.latitude, req.body.longitude]
  };
  const project = new Project({
    _creator: req.body.creatorID,
    name: req.body.name,
    description: req.body.description,
    image: "/dist/db-pictures/" + req.file.filename || '',
    completed: req.body.completed || false,
    location: location,
    address: req.body.address,
    isAwareness: req.body.isAwareness,
    isEducation: req.body.isEducation,
    isPoverty: req.body.isPoverty,
    isAnimals: req.body.isAnimals,
    isEcology: req.body.isEcology,
    isHealth: req.body.isHealth,
    isElderly: req.body.isElderly,
    isImmigrationAndDisplacement: req.body.isImmigrationAndDisplacement,
    isWater: req.body.isWater,
    isPolitics: req.body.isPolitics,
    isDisasterRelief: req.body.isDisasterRelief,
    isDisabled: req.body.isDisabled,
    isOther: req.body.isOther,
  });
  project.save((err, project) => {
    if (err) { return res.send(err); }
    return res.json(project);
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
