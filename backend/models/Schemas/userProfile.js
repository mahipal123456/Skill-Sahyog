const mongoose = require('mongoose');

const allowedLevels = [
  'New Contributor',
  'Active Volunteer',
  'Skilled Helper',
  'Expert Contributor',
  'Top Volunteer'
];

const allowedBadges = [
  'Getting Started 🛠️',
  'First Project 🎉',
  '5+ Completed 🏆',
  'Top Rated 🔥',
  'Community Favorite 💙',
  'Fast Responder ⚡',
  'Skill Master 🧠'
];

const userProfileSchema = new mongoose.Schema({
  intro: {
    type: String,
    default: "Excited to contribute and collaborate on meaningful projects."
  },

  topSkills: {
    type: [String],
    default: ['Teamwork', 'Communication']
  },

  socialLinks: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    resume: { type: String, default: "" }
  },

  stats: {
    applied: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },

  rating: { type: Number, default: 0 },

  level: {
    type: String,
    enum: allowedLevels,
    default: 'New Contributor'
  },

  badges: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.every(badge => allowedBadges.includes(badge));
      },
      message: 'One or more badges are not valid.'
    },
    default: ['Getting Started 🛠️']
  },

  completedProjects: [{
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    completedDate: { type: Date }
  }],

  appliedProjects: [{
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending'
    }
  }]
});



module.exports = userProfileSchema;
