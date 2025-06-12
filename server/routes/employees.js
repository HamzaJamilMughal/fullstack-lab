const express = require('express');
const router = express.Router();
const Employee = require('../models/Employees');

router.post('/', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
