import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateGroupPostInput } from './create-groupPost.input';

@InputType()
export class UpdateGroupPostInput extends PartialType(CreateGroupPostInput) {
  @Field(() => Int, { description: 'Variant title' })
  id: number;
}
