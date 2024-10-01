const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Automatically generated Swagger documentation',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; // Output file for Swagger
const endpointsFiles = ['./routes/todo.js']; // Path to your route files

// Generate Swagger docs
swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('../app'); // Your app entry point (app.js)
});
