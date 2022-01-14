const router = require('express').Router();
const { User } = require('../../models');

// The `/api/user` endpoint
router.get('/', (req, res) => {
  // find all users
  User.findAll({
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.get('/:id', (req, res) => {
  // find one user by its `id` value 
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.post('/', (req, res) => {
  // create a new user
 User.create(req.body).then(dbUser =>{
    res.json(dbUser);
  });
});

router.put('/:id', (req, res) => {
  // update a user by its `id` value
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.delete('/:id', (req, res) => {
  // delete a user by its `id` value
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbUser =>{
    res.json(dbUser);
  });
});

module.exports = router;
