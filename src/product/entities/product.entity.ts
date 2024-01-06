import { Category } from '@/category/entities/category.entity';
import { Variant } from './variant.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupPost } from './groupPost.entity';
import { GroupPrice } from './groupPrice.entity';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Product id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Product title' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Product description' })
  description: string;

  @Column()
  @Field(() => String, { description: 'featuredMedia', nullable: true })
  featuredMedia?: string;

  @Column()
  @Field(() => String, { description: 'medias', nullable: true })
  medias?: string;

  @Column()
  @Field(() => String, { description: 'Product handle', nullable: true })
  handle?: string;

  @Column()
  @Field(() => String, { description: 'Product tags', nullable: true })
  tags?: string;

  @Column()
  @Field(() => Int, { description: 'Product category', nullable: true })
  categoryId?: number;

  @Column()
  @Field(() => Int, { description: 'Product price', nullable: true })
  type?: number;

  @Column()
  @Field(() => Int, { description: 'isDelete' })
  isDelete: number;

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: ['remove', 'update'],
  })
  @Field(() => [Variant], { nullable: true })
  variants: Variant[];

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: ['update', 'remove'],
  })
  @Field(() => Category, { nullable: true })
  category: Category;

  @OneToMany(() => GroupPrice, (groupPrice) => groupPrice.product, {
    cascade: ['remove', 'update'],
  })
  @Field(() => [GroupPrice], { nullable: true })
  groupPrices: GroupPrice[];

  @OneToMany(() => GroupPost, (groupPost) => groupPost.product, {
    cascade: ['remove', 'update'],
  })
  @Field(() => [GroupPost], { nullable: true })
  groupPosts: GroupPost[];
}
