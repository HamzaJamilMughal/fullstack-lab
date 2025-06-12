const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees', // ✅ Must match model name exactly!
  },
  project_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // ✅ Must also match model name
  },
  start_date: Date,
});

module.exports = mongoose.model('Assignment', assignmentSchema);
