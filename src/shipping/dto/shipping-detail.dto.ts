import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class ShippingDetailDTO {
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsOptional()
    @IsString()
    postalCode: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsString()
    @IsOptional()
    shippingPartnerId: string;

    @IsString()
    @IsOptional()
    mobileNumber: string;

    @IsOptional()
    @IsObject() 
    additionalAttribute?: Record<string, string>;
}
