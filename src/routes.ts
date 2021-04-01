import { Router } from 'express';

// Controllers imports
import welcomeController from '@controllers/welcomeController';

const route: Router = Router();

route.get('/', welcomeController.welcomeMessage);

module.exports = route;
