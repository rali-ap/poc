import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Message } from './message.entity';

@Entity()
export class StreamMessage {
    @ObjectIdColumn()
    id: ObjectId;
  
    @Column()
    streamId: number;
  
    @Column(type => Message)
    messages: Message[]; 
}