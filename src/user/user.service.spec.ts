import { mockedUserDatabase } from './../utils/mocks/user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userController: UserController
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService ,  {
        provide: getRepositoryToken(User), 
        useValue: {}
      }],
      controllers: [ UserController]
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });
  it('should return an array of users', async () => {
      const result = mockedUserDatabase
      jest.spyOn(userService,'getAllUser').mockImplementation(() => Promise.resolve(result));
      expect(await userController.getAllUser()).toBe(result);
    })
 
});
