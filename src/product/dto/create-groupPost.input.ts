import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupPostInput {
  @Field(() => String, { description: 'GroupPrice title' })
  title: string;

  @Field(() => String, { description: 'GroupPrice description' })
  content: string;

  @Field(() => String, { description: 'featuredMedia', nullable: true })
  type?: string;

  @Field(() => String, { description: 'GroupPrice description' })
  variant: string;

  @Field(() => String, { description: 'medias', nullable: true })
  createdByPage?: string;

  @Field(() => Int, { description: 'productId', nullable: true })
  productId?: number;
}
