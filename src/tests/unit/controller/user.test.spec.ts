import bcrypt from 'bcrypt';
import User from '@entitys/user';
import { createConnection } from 'typeorm';
import UserService from '@service/user-service';

describe('User unit tests', () => {
  beforeAll(async () => {
    await createConnection();
  });

  it('should encrypt user password', async () => {
    const userService = new UserService();
    const newUser = new User();
    newUser.firstName = 'Rodrigo';
    newUser.lastName = 'Azevedo';
    newUser.birthDay = new Date();
    newUser.password = '123456';
    newUser.email = 'rodrigo@gmail.com';
    newUser.nickName = 'roazv';
    const user = await userService.insertOne(newUser);

    const compareHash = await bcrypt.compare('123456', user.password);

    expect(compareHash).toBe(true);
  });
});
