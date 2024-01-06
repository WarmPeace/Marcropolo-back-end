import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const newOrder = this.orderRepository.create(createOrderInput);
    const savedOrder = await this.orderRepository.save(newOrder);
    return savedOrder;
  }

  async get(search: string, sort: string, sortType: string) {
    const sql =
      ' Select `order`.*, `user`.username, `user`.email from `order` left join `user` on `order`.user = `user`.id where `order`.isDelete = 0 AND `order`.name like "%' +
      search +
      '%" order by `order`.' +
      sort +
      ' ' +
      sortType;
    return await this.orderRepository.query(sql);
  }

  getOrderDetail(id: number) {
    return this.orderRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    console.log(updateOrderInput);
    const newOrder = this.orderRepository.create(updateOrderInput);
    await this.orderRepository.update(id, newOrder);
    return newOrder;
  }

  async remove(id: number) {
    const newOrder = await this.orderRepository.findOneBy({ id: id });
    newOrder.isDelete = 1;
    await this.orderRepository.update(id, newOrder);
    return newOrder;
  }
}
