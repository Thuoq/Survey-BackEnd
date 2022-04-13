import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let findOneById:jest.Mock;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService ,  { 
        provide: getRepositoryToken(User),
        useValue: {
          findOneById
        }
      }],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe("Getting a user by id ", () => { 
    describe("and the user is matched" , () => { 
      let user:User
      beforeEach(() => { 
        user = new User()
        findOneById.mockReturnValue(Promise.resolve(user));
      })
      it("Should return user", async () => {
        const fetchUser = await userService.findOneById("sdas-dasdas-dasdsa-dasdas")
        expect(fetchUser).toEqual(user);
      })
    })
  })
});
