import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

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
}
