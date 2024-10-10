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
    status: string = 'pending'; // Default value

    @IsNotEmpty()
    paymentStatus: string = 'unknown'; // Default value

    @IsNotEmpty()
    paymentMethod: string = 'unknown'; // Default value

    @IsNotEmpty()
    @IsNumber()
    createdBy: number;

    @IsNotEmpty()
    @IsNumber()
    clientId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO) // Transform to OrderItemDTO
    items: OrderItemDTO[];

    @ValidateNested() // For nested ShippingDetail
    @Type(() => ShippingDetailDTO)
    shippingDetail: ShippingDetailDTO;
}
