import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class ShippingDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'address', nullable: false })
    address: string;

    @Column({ name: 'city', length: 30 })
    city: string;

    @Column({ name: 'state', length: 30 })
    state: string;

    @Column({ name: 'postal_code', length: 20 })
    postalCode: string;

    @Column({ name: 'country', length: 30 })
    country: string;

    @OneToOne(() => Order)
    @JoinColumn({ name: 'order_id' })  
    order: Order;
}
