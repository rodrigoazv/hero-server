import { Request, Response } from 'express';
import AuthService from '@service/auth-service';
import AuthHandler from '../utils/auth-handler';

class AuthController {
  public async login(req: Request, res: Response): Promise<any> {
    const authService = new AuthService();
    const authHandler = new AuthHandler();
    try {
      if (!req.body.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
      }
      if (!req.body.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
      }
      const user = await authService.getByEmail(req.body.email);
      const token: string = authHandler.generateToken(user);
      return res.status(200).json({
        sucess: true,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        errors: 'An error',
      });
      // Todo
    }
  }
}

export default new AuthController();
