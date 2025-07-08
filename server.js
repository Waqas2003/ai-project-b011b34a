const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let students = [
  { id: 1, name: 'John Doe', rollNo: '12345', course: 'Computer Science' },
  { id: 2, name: 'Jane Doe', rollNo: '67890', course: 'Mathematics' },
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };
  students = [...students, newStudent];
  res.json(newStudent);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});