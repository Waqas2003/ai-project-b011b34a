import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', course: '' });

  useEffect(() => {
    fetch('/api/students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
      .then(response => response.json())
      .then(data => setStudents([...students, data]));
    setNewStudent({ name: '', rollNo: '', course: '' });
  };

  const handleInputChange = event => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Student Management System</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              value={newStudent.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rollNo">
              Roll No
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="rollNo"
              type="text"
              value={newStudent.rollNo}
              onChange={handleInputChange}
              name="rollNo"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="course">
              Course
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="course"
              type="text"
              value={newStudent.course}
              onChange={handleInputChange}
              name="course"
            />
          </div>
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Student
        </button>
      </form>
      <ul className="list-none mb-0">
        {students.map(student => (
          <li key={student.id} className="py-4 border-b border-gray-200">
            <span className="text-lg">{student.name}</span>
            <span className="text-gray-600">{student.rollNo}</span>
            <span className="text-gray-600">{student.course}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;