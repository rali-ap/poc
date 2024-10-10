import {  Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class Message {
  @Column()
  messageId: string; 

  @Column()
  content: string; 

  @Column()
  userId: number; 

  @Column()
  createdAt: Date;  
}