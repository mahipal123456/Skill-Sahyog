const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  requiredSkills: [String],
  deadline: Date,
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  applicants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending'
    }
  }],
  entries: [{
    submittedBy:{ type: String },
    fileUrl: { type: String }, // e.g. S3 or server path
    submittedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });  // <-- enables createdAt and updatedAt

module.exports = mongoose.model('Project', projectSchema);
