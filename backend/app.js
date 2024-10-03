const express = require('express');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger-output.json'); // Adjust path if necessary
const userRoutes = require('./routes/student'); //the api route (รวมฟังก์ชั่นการทำงานต่างๆด้วย)
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use user routes ในที่นี้ก็คือใช้ไฟล์ที่เราทำ api และ function ต่างๆไว้
app.use(userRoutes);

// Swagger Docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Start the server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT} 🚀`));
//ใช้คำสั่ง  npm run swagger-autogen ทุกครั้งในการ start server
//ps. เค้าแก้บัคเรื่อง port กับ path ที่เคยบอกเธอให้แล้วนะ