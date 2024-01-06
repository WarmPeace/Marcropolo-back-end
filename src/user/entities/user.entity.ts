import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'User id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'User email' })
  email: string;

  @Column()
  @Field(() => String, { description: 'User password' })
  password: string;

  @Column()
  @Field(() => String, { description: 'Username', nullable: true })
  username?: string;

  @Column()
  @Field(() => String, { description: 'User first name', nullable: true })
  firstName?: string;

  @Column()
  @Field(() => String, { description: 'User last name', nullable: true })
  lastName?: string;

  @Column()
  @Field(() => Int, { description: 'User phoneNumber', nullable: true })
  phoneNumber?: number;

  @Column()
  @Field(() => Int, { description: 'isDelete' })
  isDelete: number;
}
