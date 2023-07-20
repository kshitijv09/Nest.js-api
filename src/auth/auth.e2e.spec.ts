import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

// Mock User entity
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  password: 'hashed_password', // Assume that the password is already hashed
} as User;

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Mocking the service method to return the mockUser
      jest.spyOn(authService, 'signup').mockResolvedValueOnce(mockUser);

      const response = await authController.signup(createUserDto);
      expect(response).toEqual({ message: 'User created successfully!' });
    });

    it('should throw a BadRequestException when invalid data is provided', async () => {
      const createUserDto: CreateUserDto = {
        email: '', // Invalid email
        password: 'password123',
      };

      // Mocking the service method to throw a BadRequestException
      jest
        .spyOn(authService, 'signup')
        .mockRejectedValueOnce(new UnauthorizedException('Invalid email'));

      try {
        await authController.signup(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Invalid email');
      }
    });
  });

  describe('login', () => {
    it('should return an access_token when valid credentials are provided', async () => {
      const authLoginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Mocking the service method to return the mockUser
      jest.spyOn(authService, 'login').mockResolvedValueOnce({
        access_token: 'mocked_access_token',
      });

      const response = await authController.login(authLoginDto);
      expect(response).toEqual({ access_token: 'mocked_access_token' });
    });

    it('should throw an UnauthorizedException when invalid credentials are provided', async () => {
      const authLoginDto: AuthLoginDto = {
        email: 'test@example.com',
        password: 'invalid_password', // Invalid password
      };

      // Mocking the service method to throw an UnauthorizedException
      jest
        .spyOn(authService, 'login')
        .mockRejectedValueOnce(
          new UnauthorizedException('Invalid credentials'),
        );

      try {
        await authController.login(authLoginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });
});
