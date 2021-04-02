import jwt from 'jsonwebtoken';

import User from '@entitys/user';

export default class AuthHandler {
  generateToken(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY || 'authorization',
      {
        expiresIn: '2 days',
      },
    );

    return token;
  }
}
