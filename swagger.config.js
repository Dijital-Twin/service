const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Digital Twin API',
            version: '1.0.0',
            description: 'Digital Twin API Documentation',
        },
        components: {
            securitySchemes: {
              BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              }
            }
          },
          security: [{
            BearerAuth: []
          }]
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(options);