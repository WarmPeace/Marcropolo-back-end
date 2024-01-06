import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Product title' })
  name: string;

  @Field(() => String, { description: 'Product description' })
  description: string;

  @Field(() => String, { description: 'featuredMedia', nullable: true })
  featuredMedia?: string;

  @Field(() => String, { description: 'medias', nullable: true })
  medias?: string;

  @Field(() => String, { description: 'Product handle', nullable: true })
  handle?: string;

  @Field(() => String, { description: 'Product tags', nullable: true })
  tags?: string;

  @Field(() => Int, { description: 'Product category', nullable: true })
  categoryId?: number;
}
