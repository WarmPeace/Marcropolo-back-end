import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String, { description: 'User email' })
  email: string;

  @IsString()
  @MinLength(6)
  @Field(() => String, { description: 'User password' })
  password: string;

  @IsOptional()
  @IsAlphanumeric()
  @Field(() => String, { description: 'Username', nullable: true })
  username?: string;

  @IsOptional()
  @IsAlpha()
  @Field(() => String, {
    description: 'User first name',
    nullable: true,
  })
  firstName?: string;

  @IsOptional()
  @IsAlpha()
  @Field(() => String, {
    description: 'User last name',
    nullable: true,
  })
  lastName?: string;

  @Field(() => Int, { description: 'User phoneNumber', nullable: true })
  phoneNumber?: number;
}
