const mongoose = require('mongoose');
require('dotenv').config();

const Employee = require('./models/Employees');
const Project = require('./models/Project');
const Assignment = require('./models/Assignment');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Connected to MongoDB');

    // Clear existing data
    await Assignment.deleteMany();
    await Project.deleteMany();
    await Employee.deleteMany();

    // Create employees
    const employees = await Employee.insertMany([
      { employee_id: 'E001', full_name: 'Alice Smith', email: 'alice@example.com', hashed_password: 'hashed1' },
      { employee_id: 'E002', full_name: 'Bob Johnson', email: 'bob@example.com', hashed_password: 'hashed2' },
      { employee_id: 'E003', full_name: 'Charlie Lee', email: 'charlie@example.com', hashed_password: 'hashed3' },
    ]);

    // Create projects
    const projects = await Project.insertMany([
      { project_code: 'P001', project_name: 'Apollo', project_description: 'Apollo Mission' },
      { project_code: 'P002', project_name: 'Zeus', project_description: 'Thunder App' },
    ]);

    // Create assignments
    await Assignment.insertMany([
      { employee_id: employees[0]._id, project_code: projects[0]._id, start_date: new Date('2025-06-01') },
      { employee_id: employees[1]._id, project_code: projects[1]._id, start_date: new Date('2025-06-02') },
      { employee_id: employees[2]._id, project_code: projects[0]._id, start_date: new Date('2025-06-03') },
    ]);

    console.log('🌱 Sample data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seed();
