const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

// gets all members
router.get('/s', (req, res) => res.json(members));

// get a member
router.get('/:id', (req, res) => {
  // see if the id exists
  // req.params.id is string type.
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}.` });
  }
});

// create a member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }
  if(!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email." });
  }
  members.push(newMember);
  //res.json(members);
  res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {
  // see if the id exists
  // req.params.id is string type.
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found){
    const updateMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? req.body.name : member.name;
        member.email = updateMember.email ? req.body.email : member.email;
        res.json({ msg: 'Member updated', member });
      }
    });
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}.` });
  }
});

// delete member
router.delete('/:id', (req, res) => {
  // see if the id exists
  // req.params.id is string type.
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found){
    res.json({
      msg: "member deleted",
      member: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}.` });
  }
});

module.exports = router;
