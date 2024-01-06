import { Field, ObjectType } from '@nestjs/graphql';
import { Any } from 'typeorm';

@ObjectType()
export class BaseOutput {
  @Field(() => String, { description: 'Category title' })
  status: string;

  @Field(() => Any, { description: 'Category description' })
  data: any;
}
