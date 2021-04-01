import { Router } from 'express';

// Controllers imports
import userController from '@controllers/user-controller';
import welcomeController from '@controllers/welcome-controller';

const route: Router = Router();

route.get('/', welcomeController.welcomeMessage);
route.post('/user/create', userController.create);

module.exports = route;
