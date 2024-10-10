import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderItemDTO {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    variantId: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNumber()
    discount: number = 0; 

    @IsNotEmpty()
    @IsNumber()
    orderId: number; 
}
