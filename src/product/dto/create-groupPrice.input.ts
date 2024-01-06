import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupPriceInput {
  @Field(() => String, { description: 'GroupPrice title' })
  name: string;

  @Field(() => String, { description: 'GroupPrice description' })
  description: string;

  @Field(() => Int, { description: 'featuredMedia', nullable: true })
  totalQuantity?: number;

  @Field(() => Int, { description: 'medias', nullable: true })
  price?: number;
}
