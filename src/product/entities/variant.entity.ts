import { Product } from '@/product/entities/product.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Variant {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Variant id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Variant title' })
  color: string;

  @Column()
  @Field(() => String, { description: 'Variant image' })
  size: string;

  @Column()
  @Field(() => String, { description: 'Variant sku', nullable: true })
  sku?: string;

  @Column()
  @Field(() => Int, { description: 'Variant price', nullable: true })
  price?: number;

  @Column()
  @Field(() => Int, { description: 'product Id', nullable: true })
  productId: number;

  @Column()
  @Field(() => Int, { description: 'product weight', nullable: true })
  weight?: number;

  @Column()
  @Field(() => Int, { description: 'isDelete' })
  isDelete: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Product, { nullable: true })
  product: Product;
}
