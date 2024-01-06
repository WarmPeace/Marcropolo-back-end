import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { CreateLineItemInput } from '@/line-item/dto/create-line-item.input';
import { LineItemService } from '@/line-item/line-item.service';
import { LineItem } from '../line-item/entities/line-item.entity';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly lineItemService: LineItemService,
  ) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Args({ name: 'createLineItemInput', type: () => [CreateLineItemInput] })
    createLineItemInput: CreateLineItemInput[],
  ) {
    const Order = await this.orderService.create(createOrderInput);
    await this.lineItemService.saveItems(Order.id, createLineItemInput);
    console.log(Order);
    return Order;
  }

  @Query(() => [Order])
  async getOrders(
    @Args('search') search: string,
    @Args('sort') sort: string,
    @Args('sortType') sortType: string,
  ) {
    console.log(' ---- ' + search + sort + sortType);
    const ret_data = await this.orderService.get(search, sort, sortType);
    return ret_data;
  }

  @Query(() => Order)
  getOrderDetail(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.getOrderDetail(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
