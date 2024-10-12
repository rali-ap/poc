import { Entity, ObjectIdColumn, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity('shipping_detail') 
export class ShippingDetail {
    @ObjectIdColumn() 
    id: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    postalCode: string;

    @Column()
    country: string;

    @Column()
    orderId: number;

    @Column()
    clientId: string;

    @Column(type => Object)
    additionalAttribute?: Record<string, string>;
}
