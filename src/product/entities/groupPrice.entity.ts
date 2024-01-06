import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class GroupPrice {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'GroupPrice id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'GroupPrice title' })
  name: string;

  @Column()
  @Field(() => String, { description: 'GroupPrice description' })
  description: string;

  @Column()
  @Field(() => Int, { description: 'featuredMedia', nullable: true })
  totalQuantity?: number;

  @Column()
  @Field(() => Int, { description: 'productId', nullable: true })
  productId?: number;

  @Column()
  @Field(() => Int, { description: 'medias', nullable: true })
  price?: number;

  @ManyToOne(() => Product, (product) => product.groupPrices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Product, { nullable: true })
  product: Product;
}
