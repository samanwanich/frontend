const express = require('express');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger-output.json'); // Adjust path if necessary
const userRoutes = require('./routes/todo');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use user routes
app.use('/api/todo', userRoutes);

// Swagger Docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Start the server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT} 🚀`));