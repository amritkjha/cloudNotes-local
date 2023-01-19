const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

//initialising secret code for sign function
const JWT_SECRET = 'Amriti$best';

//Route 1: create a user using POST no login required
router.post('/createuser', 
body('email').isEmail().withMessage('enter a valid email'), 
body('password', 'enter valid password').isLength(5).withMessage('password is too short'), body('name', 'enter valid name').isLength(3).withMessage('name is too short'), 
async(req, res)=>{
  //checks errors
    const errors = validationResult(req);
  //returns bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    try{
    //encrypting password using bcrypt.js
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    //creating user
    let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass //storing encrypted password
    });
    //for authentication, we use id, because it can be accessed very fast
    const data = {
      user:{ id: user.id }
    }
    //token is generated
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken})}
    //for errors
    catch(error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
});

//Route 2: for login
router.post('/login',  
body('email', 'Enter a valid email').isEmail(), 
body('password', "Password can't be blank").exists(),
async(req, res)=>{
  //checks errors
    const errors = validationResult(req);
  //returns bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({email});
      if(!user) {
        return res.status(400).json({error: "Please enter correct credentials."})
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare) {
        return res.status(400).json({error: "Please enter correct credentials."})
      }
      const data = {
        user:{ id: user.id }
      }
      //token is generated
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

// Route 3: Get logged in, user details login required ;  fetchUser is a function in middleware used for getting user id from token
router.post('/getuser', fetchUser, async(req, res)=>{
try {  //id is extracted from the response which is user.
  userId = req.user.id;
  //user is found from User and all fields are selected except password
  const user = await User.findById(userId).select("-password")
  //user is sent as response
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})
module.exports = router;