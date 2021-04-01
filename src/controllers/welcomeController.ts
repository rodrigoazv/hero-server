import { Request, Response } from 'express';

class AdminLoginController {
  public async welcomeMessage(req: Request, res: Response) {
    res.status(200).json({
      sucess: true,
    });
  }
}

export default new AdminLoginController();
