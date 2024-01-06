import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => Int, { description: 'Order id' })
  id: number;

  @Field(() => String, { description: 'Order name' })
  name: string;

  @Field(() => String, { description: 'User id' })
  user: string;

  @Field(() => Int, { description: 'SubtotalPriceSet' })
  subtotalPriceSet: number;
}
