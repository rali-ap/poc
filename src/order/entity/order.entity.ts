import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_amount', nullable: false })
  totalAmount: number;

  @Column({ name: 'total_item', nullable: false })
  totalItem: number

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'status', default: 'pending', length: 30 })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'payment_status',  default: 'unknown', length: 30 })
  paymentStatus: string;

  @Column({ name: 'payment_method',  default: 'unknown', length: 30 })
  paymentMethod: string;

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @IsNotEmpty()
  @Column({ name: 'client_id' }) 
  clientId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}
