var express = require('express');
var router = express.Router();
const UserModel = require('../models/user.model');
const { registerValidation } = require('../validation/validation');
const bcrypt = require('bcryptjs');

//  API dang ky user moi
router.post('/register', async function (req, res) {
  // Validation user
  const { err } = registerValidation(req.body);
  if(err) return res.status(400).send(err.details[0].message);


  // kiem tra email da ton tai trong mongodb chua
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if(emailExists) return res.status(400).send('Email exitsts in database'); 
    console.log(111);
  // Ma hoa passwork
  const salt = await bcrypt.genSalt(10);
  const hashPasswork = await bcrypt.hash(req.body.passwork, salt);
    console.log(222);
  // Luu thong tin user trong db
  const newUser = new UserModel();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.passwork = hashPasswork;

  try{
    const user = await newUser.save();
    res.send(user);

  } catch (error) {
    res.status(400).send(400);
  }
});



module.exports = router;
