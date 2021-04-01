import express from 'express';

// iuse

export class Application {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    // at the suggestion of the eslint documentation,
    // when the require module has a very specific use,
    // it disables the module in the line
    // eslint-disable-next-line global-require
    this.express.use(require('./routes'));
  }

  public Setup(): void {
    this.express.listen(3333);
  }
}

export default new Application();
