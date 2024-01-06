import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { CreateGroupPriceInput } from './create-groupPrice.input';

@InputType()
export class UpdateGroupPriceInput extends PartialType(CreateGroupPriceInput) {}
