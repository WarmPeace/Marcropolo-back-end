import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVariantInput {
  @Field(() => String, { description: 'Variant title' })
  color: string;

  @Field(() => String, { description: 'Variant image', nullable: true })
  size: string;

  @Field(() => String, { description: 'Variant sku', nullable: true })
  sku?: string;

  @Field(() => Int, { description: 'Variant price', nullable: true })
  price?: number;

  @Field(() => Int, { description: 'product Id', nullable: true })
  weight?: number;
}
