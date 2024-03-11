const express = require('express')
const router = express.Router()
// const swaggerJsdoc = require('swagger-jsdoc')
const swaggerDocument = require('./docs/swagger_exp.json');
const swaggerUi = require('swagger-ui-express')

// const options = {
//     swaggerDefinition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'My API',
//         version: '1.0.0',
//         description: 'My REST API',
//       },
//       servers: [
//         {
//           url: 'http://localhost:5000',
//         },
//       ],
//     },
//     apis: ['./router/*'],
//   }

//   const specs = swaggerJsdoc(options)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// router.use('/', swaggerUi.serve, swaggerUi.setup(specs))
module.exports = router;