const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const studentFilePath = path.join(__dirname, 'student.json');

function readStudentData() {
  try {
    const data = fs.readFileSync(studentFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeStudentData(data) {
  try {
    fs.writeFileSync(studentFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to student JSON file:', err);
  }
}


app.post('/api/students', (req, res) => {
  const studentData = readStudentData();
  const newStudent = req.body;
  studentData.push(newStudent);
  writeStudentData(studentData);
  res.status(201).json({ message: 'Student created successfully' });
});

app.get('/api/students', (req, res) => {
  const studentData = readStudentData();
  res.json(studentData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
