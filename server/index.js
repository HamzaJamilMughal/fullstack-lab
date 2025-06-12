require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(5070, () => console.log("🚀 Server running on http://localhost:5070"));



const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');

app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project_assignments', assignmentRoutes);


const Employee = require('./models/Employees');
const Project = require('./models/Project');
const Assignment = require('./models/Assignment');

app.get('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Employee.deleteMany();
    await Project.deleteMany();
    await Assignment.deleteMany();

    // Add Employees
    const employees = await Employee.insertMany([
      { employee_id: "E001", full_name: "Hamza Jameel", email: "hamza1@example.com", hashed_password: "pass1" },
      { employee_id: "E002", full_name: "Sara Khan", email: "sara@example.com", hashed_password: "pass2" },
      { employee_id: "E003", full_name: "Ali Raza", email: "ali@example.com", hashed_password: "pass3" },
      { employee_id: "E004", full_name: "Fatima Noor", email: "fatima@example.com", hashed_password: "pass4" },
      { employee_id: "E005", full_name: "Zain Malik", email: "zain@example.com", hashed_password: "pass5" }
    ]);

    // Add Projects
    const projects = await Project.insertMany([
      { project_code: "P001", project_name: "Web App", project_description: "Fullstack React Project" },
      { project_code: "P002", project_name: "API Server", project_description: "RESTful Node.js API" },
      { project_code: "P003", project_name: "Admin Panel", project_description: "Internal dashboard" },
      { project_code: "P004", project_name: "Analytics", project_description: "Charts & Reports" },
      { project_code: "P005", project_name: "Mobile App", project_description: "React Native frontend" }
    ]);

    // Add Assignments
    const assignments = await Assignment.insertMany([
      { employee_id: employees[0]._id, project_code: projects[0]._id, start_date: "2024-06-01" },
      { employee_id: employees[1]._id, project_code: projects[1]._id, start_date: "2024-06-03" },
      { employee_id: employees[2]._id, project_code: projects[2]._id, start_date: "2024-06-05" },
      { employee_id: employees[3]._id, project_code: projects[3]._id, start_date: "2024-06-07" },
      { employee_id: employees[4]._id, project_code: projects[4]._id, start_date: "2024-06-09" }
    ]);

    res.status(200).json({ message: "✅ Seeded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Seeding failed" });
  }
});

