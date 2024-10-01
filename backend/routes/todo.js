const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config()
const db = mysql.createConnection({
  host: process.env.host, // XAMPP usually runs MySQL on localhost
  user: process.env.user,      // Default XAMPP MySQL user
  password: process.env.password,      // Default XAMPP MySQL password is empty
  database: process.env.database // Name of your database
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

router.get('/students', (req, res) => {
  const query = 'SELECT * FROM student'; // Your SQL query to fetch student data

  db.query(query, (err, results) => {
    if (err) {
      console.error('SQL query failed: ', err);
      res.status(500).send('Server error');
      return;
    }

    // Send the results as JSON
    res.json(results);
  });
});

router.post('/insertStudent', (req, res) => {
  const { studentId, prefix, name, lastname, course, grade, room, status } = req.body;

  // SQL query to insert a new student
  const query = `INSERT INTO student (studentId, prefix, name, lastname, course, grade, room, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Values to be inserted
  const values = [studentId, prefix, name, lastname, course, grade, room, status];

  // Execute the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('SQL query failed: ', err);
      res.status(500).send('Server error');
      return;
    }

    // Send success response
    res.status(201).send('Student added successfully');
  });
});

// Example route: Get a user by ID
router.get('/student/:id', (req, res) => {
  const studentId = req.params.id;

  const query = 'SELECT * FROM student WHERE studentId = ?'; // Your SQL query to fetch student data

  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('SQL query failed: ', err);
      res.status(500).send('Server error');
      return;
    }

    if (results.length === 0) {
      return res.status(404).send('Student not found'); // Handle case where no student is found
    }
    
    // Send the results as JSON
    res.json(results[0]);
  });
});

module.exports = router;
