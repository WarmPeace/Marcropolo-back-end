import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { GroupPrice } from './entities/groupPrice.entity';
import { GroupPost } from './entities/groupPost.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Variant, GroupPrice, GroupPost]),
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
