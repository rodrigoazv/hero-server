import { Router } from 'express';

// Controllers imports
import userController from '@controllers/user-controller';
import authController from '@controllers/auth-controller';

const route: Router = Router();

route.post('/user/create', userController.create);
route.post('/user/login', authController.login);

module.exports = route;
