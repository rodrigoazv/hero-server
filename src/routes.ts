import { Router } from 'express';

// Controllers imports
import userController from '@controllers/user-controller';
import authController from '@controllers/auth-controller';

const route: Router = Router();
// User routes
route.post('/user/create', userController.create);
route.put('/user/update', userController.update);
// Auth routes
route.post('/user/login', authController.login);
// Comics protected routes

module.exports = route;
