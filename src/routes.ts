import { Router } from 'express';

// Controllers imports
import userController from '@controllers/user-controller';
import authController from '@controllers/auth-controller';
import marvelController from '@controllers/char-controller';
// Middleware imports
import verifyHandle from './middlewares/verify-token-handler';

const router = Router();
// User routes
router.post('/user/create', userController.create);
router.put('/user/update', userController.update);
router.get('/user/:id', verifyHandle, userController.indexUserById);
// Auth routes
router.post('/user/login', authController.login);
// Comics protected routes
router.get('/char/index', marvelController.indexChar);
export default router;
