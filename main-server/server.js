import express from 'express';
import morgan from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';

class Server {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
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
    this.app.get('main-server');
    // this.app.use('/api/v1/tours', tourRouter);
  }
}

export default Server;
