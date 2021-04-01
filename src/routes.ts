import { Router } from 'express';

// Controllers imports
import welcomeController from './controllers/welcome-controller';

const route: Router = Router();

route.get('/', welcomeController.welcomeMessage);

module.exports = route;
