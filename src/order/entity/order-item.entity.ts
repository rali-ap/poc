import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Order } from './order.entity';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@Entity()
@Unique(["orderId", "productId", "variantId"]) 
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id', length: 40 })
  @IsNotEmpty()
  productId: string;

  @Column({ name: 'variant_id', length: 40 })
  @IsNotEmpty()
  variantId: string;

  @Column({ name: 'quantity' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive() 

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 }) 
  @IsNotEmpty()
  price: number;

  @Column({ name: 'discount', type: 'decimal', default: 0.0 })
  discount: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' }) 
  order: Order;
  @Column({ name: 'order_id', nullable: false })
  orderId: number;
}
