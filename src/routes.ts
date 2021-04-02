import { Router } from 'express';

// Controllers imports
import userController from '@controllers/user-controller';
import authController from '@controllers/auth-controller';

const router = Router();
// User routes
router.post('/user/create', userController.create);
router.put('/user/update', userController.update);
router.get('/user/:id', userController.indexUserById);
// Auth routes
router.post('/user/login', authController.login);
// Comics protected routes
export default router;
