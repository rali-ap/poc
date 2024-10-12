import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { OrderDTO } from './dto/order.dto';
import { ShippingDetail } from 'src/shipping/entity/shipping-detail.entity.mongo';
import { ShippingService } from 'src/shipping/shipping.service';

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name)

    constructor(
        @InjectRepository(Order, 'postgresDataSource') private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem, 'postgresDataSource') private readonly orderItemRepository: Repository<OrderItem>,
        private readonly shippingService: ShippingService,
    ) { }

    async createOrder(clientId: string, orderDto: OrderDTO) {
        this.logger.debug(JSON.stringify(orderDto));
        //TODO validation

        //TODO if orderItem.discount > 0 check if product or product variant has allow discount and productItem.discount <= product.maxDiscount | variant.maxDiscount 
        // TODO somm of all quantity and allproice  == order.totalItem && order.totalAmount 
        if (!orderDto.items || orderDto.items.length <= 0) {
            throw new BadRequestException('Order request does not have any product')
        }

        const variantIds = orderDto.items.map(orderItem => orderItem.variantId);
        //TODO pull variants with variantIds an cleint-id, create a map<variantid, stock>. iterate the order-items and check clientId, productId, variant id against the map
        //TODO also validate the sock 
        //TODO for each variant find a map<variant-id, {product.discountEnabled, product.discount, variant.discountEnabled, variant.discount} 

        this.logger.debug(JSON.stringify(variantIds));

        const order: Order = await this.orderRepository.create(orderDto);
        order.items = [];
        order.clientId = clientId;
        await this.orderRepository.save(order);

        const orderItems: OrderItem[] = orderDto.items.map(orderItemDto => {
            const orderItem = this.orderItemRepository.create(orderItemDto);
            orderItem.order = order;
            return orderItem;
        })
        await this.orderItemRepository.save(orderItems);

        if(orderDto.shippingDetail) {
            await this.shippingService.createShippingDetail(clientId, order.id, orderDto.shippingDetail);
        }

        //TODO find all product stocks 

        //TODO save order
        //TODO save orderItems 
        //TODO save shippingDetail 
    }
}
