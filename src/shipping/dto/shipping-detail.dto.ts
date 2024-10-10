import { IsNotEmpty } from 'class-validator';

export class ShippingDetailDTO {
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    postalCode: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    clientId: string; // Assuming this is a string
}
