import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  async findUsersBySearch(search: string, sort: string, sortType: string) {
    const sql =
      ' SELECT * FROM user WHERE isDelete = 0 AND username LIKE "%' +
      search +
      '%" ORDER BY ' +
      sort +
      ' ' +
      sortType;
    return await this.userRepository.query(sql);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const newUser = this.userRepository.create(updateUserInput);
    await this.userRepository.update(id, newUser);
    return newUser;
  }

  async remove(id: number) {
    const deleteUser = await this.userRepository.findOneBy({ id });
    deleteUser.isDelete = 1;
    await this.userRepository.update(id, deleteUser);
    return deleteUser;
  }
}
