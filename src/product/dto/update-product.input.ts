import { CreateProductInput } from './create-product.input';
import { Field, Int, PartialType, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => Int, { description: 'Product title' })
  id: number;
}
