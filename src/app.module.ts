import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/user/user.module';
import { join } from 'path';
import { AuthModule } from '@/auth/auth.module';
import { OrderModule } from './order/order.module';
import { LineItemModule } from './line-item/line-item.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.10.10.113',
      port: 3306,
      username: 'root',
      password: '',
      database: 'marcopolo_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    LineItemModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
