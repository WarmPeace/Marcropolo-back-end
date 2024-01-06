import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLineItemInput } from './dto/create-line-item.input';
import { UpdateLineItemInput } from './dto/update-line-item.input';
import { LineItem } from './entities/line-item.entity';

@Injectable()
export class LineItemService {
  // static lineItemRepository: any;
  constructor(
    @InjectRepository(LineItem)
    private lineItemRepository: Repository<LineItem>,
  ) {}

  async saveItems(id: number, createLineItemInput: CreateLineItemInput[]) {
    for (let i = 0; i < createLineItemInput.length; i++) {
      const newItem = new LineItem();
      newItem.quantity = createLineItemInput[i].quantity;
      newItem.price = createLineItemInput[i].price;
      newItem.variant = createLineItemInput[i].variant;
      newItem.product = createLineItemInput[i].product;
      newItem.orderId = id;
      await this.lineItemRepository.save(newItem);
    }
  }

  findAll() {
    return `This action returns all lineItem`;
  }

  findByOrderId(id: number) {
    return this.lineItemRepository.find({
      where: { orderId: id },
    });
  }

  update(id: number, updateLineItemInput: UpdateLineItemInput) {
    return `This action updates a #${id} lineItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} lineItem`;
  }
}
