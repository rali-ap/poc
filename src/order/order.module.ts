import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { ShippingModule } from 'src/shipping/shipping.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem
    ],  'postgresDataSource'),
    ShippingModule
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
