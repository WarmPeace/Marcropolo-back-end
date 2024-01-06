import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLineItemInput {
  @Field(() => Int, { description: 'quantity' })
  quantity: number;

  @Field(() => Int, { description: 'price' })
  price: number;

  @Field(() => Int, { description: 'product id' })
  product: number;

  @Field(() => Int, { description: 'variant id' })
  variant: number;
}
