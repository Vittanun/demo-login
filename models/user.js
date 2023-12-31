const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
  return token ;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object ({
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required()
  });
  
  return schema.validate(user);
}
  
exports.User = User;
exports.validate = validateUser;