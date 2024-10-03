const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; // Output file for Swagger
const endpointsFiles = ['./routes/student.js']; // Path to your route files
//const endpointsFiles = ['./routes/student.js', './routes/teacher.js']; //สำหรับในกรณีมีหลายไฟล์

const dotenv = require('dotenv'); //ใช้เรียก library
dotenv.config() //ใช้ dotenv ที่เราประกาศก่อนหน้าให้อ่าน config ในที่นี้คืออ่านไฟล์ .env จากโฟลเดอร์ backend

//config ของ swagger 
const doc = {
  info: {
    title: 'My API',
    description: 'Automatically generated Swagger documentation',
  },
  host: 'localhost:' + process.env.PORT, //ชื่อ server + port ในที่นี้ก็คือ localhost(รันบนเครื่องตัวเอง) + port จาก .env
  schemes: ['http'],
};

// Generate Swagger docs
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../app'); // Your app entry point (app.js)
});
