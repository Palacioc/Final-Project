var express = require('express');
var router = express.Router();
const Proposal = require('./proposal.model');


/* GET proposal listing. */
router.get('/', (req, res, next) => {
  Proposal.find({})
  .exec((err, Proposal) => {
    if(err) { return res.send(err); }
    return res.json(Proposal);
  });
});

/* CREATE a new Proposal. */
router.post('/', (req, res) => {
  const proposal = new Proposal({
    _need: req.body.needID,
    _contributor: req.body.contributorID,
    coverage: req.body.coverage || 'Green',
    comment: req.body.comment || 'I am happy to help to this cause!',
    amount: req.body.amount || 0,
  });

  proposal.save((err) => {
    if (err) { return res.send(err); }
    return res.json({ message: 'New proposal created correctly!' });
  });
});




module.exports = router;
