import { Injectable, Logger } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ShippingDetail } from './entity/shipping-detail.entity.mongo';


@Injectable()
export class ShippingService {
    private readonly logger = new Logger(ShippingService.name)

    constructor(
        @InjectRepository(ShippingDetail, 'mongoDataSource') private readonly shippingDetailRepository: MongoRepository<ShippingDetail>,
    ) { }

}
