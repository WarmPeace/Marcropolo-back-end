import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class GroupPost {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'GroupPrice id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'GroupPrice title' })
  title: string;

  @Column()
  @Field(() => String, { description: 'featuredMedia', nullable: true })
  content?: string;

  @Column()
  @Field(() => String, { description: 'medias', nullable: true })
  type?: string;

  @Column()
  @Field(() => String, { description: 'GroupPrice description' })
  variant: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String, { description: 'featuredMedia', nullable: true })
  endAt?: string;

  @Column()
  @Field(() => String, { description: 'medias', nullable: true })
  createdByPage?: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String, { description: 'medias', nullable: true })
  createdAt?: string;

  @Column()
  @Field(() => Int, { description: 'productId', nullable: true })
  productId?: number;

  @ManyToOne(() => Product, (product) => product.groupPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => Product, { nullable: true })
  product: Product;
}
