import { Module } from '@nestjs/common';
import { LineItemService } from './line-item.service';
import { LineItemResolver } from './line-item.resolver';
import { LineItem } from './entities/line-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LineItem])],
  providers: [LineItemResolver, LineItemService],
  exports: [LineItemService],
})
export class LineItemModule {}
