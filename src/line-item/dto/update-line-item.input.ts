import { CreateLineItemInput } from './create-line-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLineItemInput extends PartialType(CreateLineItemInput) {
  @Field(() => Int)
  id: number;
}
