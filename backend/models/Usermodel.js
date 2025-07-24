const mongoose = require('mongoose');
const userProfileSchema = require('./Schemas/userProfile');
const ngoProfileSchema = require('./Schemas/ngoProfile');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'ngo', 'admin'], required: true },
  userProfile: userProfileSchema,
  ngoProfile: ngoProfileSchema
});

module.exports = mongoose.model('User', userSchema);
