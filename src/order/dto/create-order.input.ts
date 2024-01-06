import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: 'Order name' })
  name: string;

  @Field(() => String, { description: 'User id' })
  user: string;

  @Field(() => Int, { description: 'SubtotalPriceSet' })
  subtotalPriceSet: number;
}
