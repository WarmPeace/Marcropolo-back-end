import { Order } from '@/order/entities/order.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { type } from 'os';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class LineItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'lineItem id' })
  id: number;

  @Column()
  @Field(() => Int, { description: 'lineItem quantity' })
  quantity: number;

  @Column()
  @Field(() => Int, { description: 'Price' })
  price: number;

  @Column()
  @Field(() => Int, { description: 'product' })
  product: number;

  @Column()
  @Field(() => Int, { description: 'variant', nullable: true })
  variant: number;

  @Column()
  @Field(() => Int, { description: 'order id' })
  orderId: number;

  @Column()
  @Field(() => Int, { description: 'isDelete' })
  isDelete: number;

  @ManyToOne(() => Order, (order) => order.lineItems)
  @Field(() => Order, { nullable: true })
  order: Order;
}
