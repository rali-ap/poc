import { Injectable, Logger } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ShippingDetail } from './entity/shipping-detail.entity.mongo';
import { ShippingDetailDTO } from './dto/shipping-detail.dto';


@Injectable()
export class ShippingService {

    private readonly logger = new Logger(ShippingService.name)

    constructor(
        @InjectRepository(ShippingDetail, 'mongoDataSource') private readonly shippingDetailRepository: MongoRepository<ShippingDetail>,
    ) { }

    async createShippingDetail(clientId: string, orderId: number, shippingDetailDto: ShippingDetailDTO) {
        //TODO validate shipping-deatils with shippingPartnerId 

        const shippingDetail: ShippingDetail = await this.shippingDetailRepository.create(shippingDetailDto);
        shippingDetail.clientId = clientId;
        shippingDetail.orderId = orderId;
        shippingDetail.additionalAttribute = shippingDetailDto.additionalAttribute;

        await this.shippingDetailRepository.save(shippingDetail);
    }
}
