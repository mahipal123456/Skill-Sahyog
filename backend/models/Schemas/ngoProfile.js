const mongoose = require('mongoose');

const ngoProfileSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    default: "Example Organization"
  },
  mission: {
    type: String,
    default: "Our mission is to make the world a better place."
  },
  foundedYear: {
    type: Number,
    default: 2000
  },
  website: {
    type: String,
    default: "https://www.example.org"
  },
  address: {
    type: String,
    default: "123 Main Street, City, Country"
  },
  contactEmail: {
    type: String,
    default: "contact@example.org"
  },
  // logoURL: {
  //   type: String,
  //   default: "https://via.placeholder.com/150?text=Logo"
  // },
  socialLinks: {
    facebook: {
      type: String,
      default: "https://facebook.com/example"
    },
    linkedin: {
      type: String,
      default: "https://linkedin.com/company/example"
    },
    instagram: {
      type: String,
      default: "https://instagram.com/example"
    }
  },
  postedProjects: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
    default: []
  }
}, { _id: false });


module.exports = ngoProfileSchema;
