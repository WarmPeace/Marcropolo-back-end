import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  // @UseGuards(JwtAuthGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User])
  async getUsers(
    @Args('search') search: string,
    @Args('sort') sort: string,
    @Args('sortType') sortType: string,
  ) {
    return this.userService.findUsersBySearch(search, sort, sortType);
  }

  @Query(() => User, { name: 'userById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'userByUsername' })
  findOneByUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.userService.findOneByUsername(username);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const data = await this.userService.remove(id);
    return data;
  }
}
