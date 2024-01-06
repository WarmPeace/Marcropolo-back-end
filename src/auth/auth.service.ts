import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/entities/user.entity';
import { CreateUserInput } from '@/user/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const valid = await bcrypt.compare(password, user.password);
    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async verifyToken(token: string) {
    const isValidToken = await this.jwtService.decode(token);
    if (isValidToken) {
      const user = await this.userService.findOne(isValidToken.sub);
      if (!user)
        throw new UserInputError('No user found with this login credentials.');
      return user;
    }
  }

  login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(createUserInput: CreateUserInput): Promise<User> {
    console.log('come');

    const user = await this.userService.findOneByUsername(
      createUserInput.username,
    );

    if (user) {
      throw new Error('User already exists!');
    }
    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.userService.create({
      ...createUserInput,
      password,
    });
  }
}
