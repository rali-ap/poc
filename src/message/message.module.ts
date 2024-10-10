import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamMessage } from 'src/entity/stream-message.entity.mongo';

@Module({
  imports : [
    TypeOrmModule.forFeature([StreamMessage], 'mongoDataSource'),
  ],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule {}
