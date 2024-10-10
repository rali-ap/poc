import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name)

    constructor(
        @InjectRepository(Order, 'postgresDataSource') private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem, 'postgresDataSource') private readonly orderItemRepository: Repository<OrderItem>,
    ) { }

    async createOrder(orderDTO: OrderDTO) {

    }
}
