import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Category title' })
  name: string;

  @Field(() => String, { description: 'Category description' })
  description: string;

  @Field(() => String, { description: 'Category attributes', nullable: true })
  attributes?: string;
}
