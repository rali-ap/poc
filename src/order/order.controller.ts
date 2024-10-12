import { Body, Controller, Logger, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('orders')
export class OrderController {

    private readonly logger = new Logger(OrderController.name)

    constructor(
        private readonly orderService: OrderService
    ) { }


    @Post()
    async createMessage(@Body() orderDTO: OrderDTO): Promise<void> {
       
        const clientId: string = "1234ds57sd8sd1sdsdsd44"
        await this.orderService.createOrder(clientId, orderDTO);
    }
}
