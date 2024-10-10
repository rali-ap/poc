import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShippingService } from './shipping.service';

import { ShippingDetail } from './entity/shipping-detail.entity.mongo';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShippingDetail
    ], 'mongoDataSource'),
  ],
  providers: [ShippingService]
})
export class ShippingModule {}
