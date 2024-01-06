import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { LineItemModule } from '@/line-item/line-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), LineItemModule],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
