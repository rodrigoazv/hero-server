import { Router } from 'express';

// Controllers imports
import userController from '@controllers/user-controller';

const route: Router = Router();

route.post('/user/create', userController.create);

module.exports = route;
