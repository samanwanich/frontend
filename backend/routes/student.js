const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dotenv = require('dotenv'); //ใช้เรียก library
dotenv.config() //ใช้ dotenv ที่เราประกาศก่อนหน้าให้อ่าน config ในที่นี้คืออ่านไฟล์ .env จากโฟลเดอร์ backend

const db = mysql.createConnection({ //ทั้งหมดข้างล่างนี้อ่านค่าจากไฟล์ .env โดยวิธีการเรียกคือ "process.env.ชื่อ"
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

router.get('/student/query', (req, res) => {
  const query = 'SELECT * FROM student'; // Your SQL query to fetch student data

  db.query(query, (err, results) => {
    if (err) {
      console.error('SQL query failed: ', err);
      res.status(500).send('Server error');
      return;
    }

    // Send the results as JSON
    return res.json(results.length ? results : []);
  });
});

// Example route: Get a user by ID
//ใช้เพื่อหาโปรไฟล์ของนักเรียนแต่ละคน อยากได้อะไรเพิ่มก็ INNER JOIN ด้วย key ต่างๆ ไม่เข้าใจก็ถามเค้าได้นะ มันยังไม่เสร็จดีน่ะ ต้องสร้าง table เพิ่ม
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


router.post('/student/insert', (req, res) => {
  //request body จะเป็น... 
  /*
    [
      {
        studentId: 'รหัสนักเรียน',
        prefix: 'คำนำหน้า',
        name: 'ชื่อ',
        lastname: 'นามสกุล',
        course: 'หลักสูตร',
        grade: 'ชั้น',
        room: 'ห้อง',
        status: 'ไปกลับ/หอพัก'
      },
      {
        studentId: 'รหัสนักเรียน',
        prefix: 'คำนำหน้า',
        name: 'ชื่อ',
        lastname: 'นามสกุล',
        course: 'หลักสูตร',
        grade: 'ชั้น',
        room: 'ห้อง',
        status: 'ไปกลับ/หอพัก'
      }
    ]
  *///ถ้ามีคนเดียว ก็ใช้แค่ก้อนเดียว
  const students = req.body; // Expecting an array of students

  if (!Array.isArray(students)) {
    return res.status(400).send('Request body must be an array of students');
  }

  // SQL query to insert a new student
  const query = `INSERT INTO student (studentId, prefix, name, lastname, course, grade, room, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Array to keep track of any errors during the insertion process
  const errors = [];

  students.forEach((student, index) => {
    const { studentId, prefix, name, lastname, course, grade, room, status } = student;

    // Values to be inserted for each  // ใช้ column name in database เพื่อความง่ายนะ ประกาศง่าย ดูง่าย จำง่าย
    const values = [studentId, prefix, name, lastname, course, grade, room, status];

    // Execute the query for each student
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(`SQL query failed for student ${studentId}: `, err);
        errors.push(`Failed to insert student with ID ${studentId}: ${err.message}`);
      }

      // If it's the last student in the loop, send the final response
      if (index === students.length - 1) {
        if (errors.length) {
          return res.status(500).json({ message: 'Some students failed to insert', errors });
        }
        return res.status(200).send('All students added successfully');
      }
    });
  });
});

module.exports = router;
