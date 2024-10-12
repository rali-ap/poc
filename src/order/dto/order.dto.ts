import { IsNotEmpty, IsNumber, IsPositive, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDTO } from './order-item.dto';
import { ShippingDetailDTO } from 'src/shipping/dto/shipping-detail.dto';

export class OrderDTO {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalItem: number;

    @IsNumber()
    userId?: number;

    @IsNotEmpty()
    status: string = 'pending'; 

    @IsNotEmpty()
    paymentStatus: string = 'unknown'; 

    @IsNotEmpty()
    paymentMethod: string = 'unknown';

    @IsNotEmpty()
    @IsNumber()
    createdBy: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items: OrderItemDTO[];

    @ValidateNested() 
    @Type(() => ShippingDetailDTO)
    shippingDetail: ShippingDetailDTO;
}
