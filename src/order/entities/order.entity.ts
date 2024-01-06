import { LineItem } from '@/line-item/entities/line-item.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  OneToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Order id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Order name' })
  name: string;

  @Column()
  @Field(() => String, { description: 'User id' })
  user: string;

  @Column()
  @Field(() => Int, { description: 'SubtotalPriceSet' })
  subtotalPriceSet: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date, { description: 'Order name' })
  createdAt: Date;

  @Column()
  @Field(() => Int, { description: 'isDelete' })
  isDelete: number;

  @OneToMany(() => LineItem, (lineItem) => lineItem.order)
  @Field(() => [LineItem], { nullable: true })
  lineItems: LineItem[];
}
