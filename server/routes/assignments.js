const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

router.post('/', async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('employee_id', 'full_name employee_id')
      .populate('project_code', 'project_name project_code')
      .sort({ start_date: -1 });

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
