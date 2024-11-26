import express from 'express';
import morgan from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';

import recipeRouter from "./main-server/routes/recipeRoutes.js"
import userRouter from "./auth-server/routes/userRoutes.js"

import expressGlobalErrorHandling from './utils/expressGlobalErrorHandling.js';

class Server {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.errorHandling()
  }

  run(port) {
    this.server = this.app.listen(port, () => console.log(`Listening on port ${port}`));
  }

  setupMiddlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(ExpressMongoSanitize());
  }

  setupRoutes() {
    this.app.use('/api/v1/recipes', recipeRouter);
    this.app.use('/api/v1/users', userRouter);
  }

  errorHandling() {
    //this.app.use(expressGlobalErrorHandling)
    process.on('uncaughtException', (err) => {
      console.log('Unhandled Exception. Shutting Down...')
      console.log(err.name, err.message);
      process.exit(1);
    });
    process.on('unhandledRejection', (err) => {
      console.log(err.name, err.message);
      console.log('💥 Unhandled Rejection. Shutting Down...')
      this.server.close(() => {
        process.exit(1);
      });
    });
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM recieved, shutting DOWN!!');
      this.server.close(() => {
        console.log('👋 process terminated!')
      })
    })
  }
}

export default Server;
