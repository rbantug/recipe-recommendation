This is a template for clean architecture. While we can use different web frameworks and databases, the template will initially focus on Express.js, MongoDB Driver and Redis/Valkey

The plan is to create 2 servers. One for the main-server that will contain the different app entities. And another for the auth-server that will contain the user entity.

The packages used in this project:

Dependencies:

Express
express-mongo-sanitize
Joi
mongodb (MongoDB Node.js Driver)

Devdependencies:

morgan
eslint
nodemon

    Testing:

    faker-js
    supertest
    vitest
    mongodb-memory-server
    

