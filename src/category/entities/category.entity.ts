import { Product } from '@/product/entities/product.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Category id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Category title' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Category description' })
  description: string;

  @Column()
  @Field(() => String, { description: 'Category attributes', nullable: true })
  attributes?: string;

  @Column()
  @Field(() => Int, { description: 'isDelete' })
  isDelete: number;

  @OneToMany(() => Product, (Product) => Product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => [Product], { nullable: true })
  products: Product[];
}
