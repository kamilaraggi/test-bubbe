const router = require('express').Router();
const User  = require('../../models/user');
const auth = require("../../middleware/auth");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');


function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

// // The `/api/user` endpoint
// router.get('/',auth, (req, res) => {
//   // find all users
//   User.findAll({
//   }).then(dbUser => {
//     res.json(dbUser);
//   });
// });

router.get('/:id',auth, (req, res) => {

  if(req.params.id != req.user.id){
    return res.sendStatus(403);
  }

  
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
  var salt = crypto.randomBytes(20).toString('hex');
  var saltedPassword = req.body.password + salt;
  for (let i = 0; i < 3; i++) {
    saltedPassword = crypto
                          .createHash('sha256') 
                          .update(saltedPassword) 
                          .digest('hex');
  }
  // create a new user
  var form = {
    'firstname' : req.body.firstname, 
    'lastname' : req.body.lastname,
    'username' : req.body.username,
    'password' : saltedPassword,
    'salt' : salt
  };
 User.create(form).then(dbUser =>{

    res.json({
      "id" : dbUser.id,
      "username": dbUser.username,
      "token": generateAccessToken({ id: dbUser.id })
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    } 
  }).then(dbUser => {
    if(!dbUser) {
      res.send(401);
      return;
    }

  var saltedPassword = req.body.password + dbUser.salt;
  for (let i = 0; i < 3; i++) {
    saltedPassword = crypto
                          .createHash('sha256') 
                          .update(saltedPassword) 
                          .digest('hex');
  }

  if (dbUser.password == saltedPassword) {
    res.json({
      "id" : dbUser.id,
      "username": dbUser.username,
      "token": generateAccessToken({ id: dbUser.id })
    });
  } else {
    res.send(401);
  }
  });
});
router.put('/:id', auth, (req, res) => {

  if(req.body.id != req.user.id){
    return res.sendStatus(403);
  }
  // update a user by its `id` value
  User.findOne({
    where: {
      id: req.body.id
    } 
  }).then(dbUser => {
    if(!dbUser) {
      res.send(401);
      return;
    }
    if (req.body.password) {
      var saltedPassword = req.body.password + dbUser.salt;
      for (let i = 0; i < 3; i++) {
        saltedPassword = crypto
                              .createHash('sha256') 
                              .update(saltedPassword) 
                              .digest('hex');
      }
      req.body.password = saltedPassword;
    }
  
    User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbUser => {
      res.json(dbUser);
      console.log(dbUser);
    });
  });
});

router.delete('/:id',auth, (req, res) => {

  if(req.params.id != req.user.id){
    return res.sendStatus(403);
  }
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
