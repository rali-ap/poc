import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { MessageReqDto } from 'src/dto/message-req.dto';
import { Message } from 'src/entity/message.entity';
import { StreamMessage } from 'src/entity/stream-message.entity.mongo';
import { MongoRepository } from 'typeorm';

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name)

    constructor(
        @InjectRepository(StreamMessage, 'mongoDataSource') private readonly streamMessageRepository: MongoRepository<StreamMessage>,
    ) { }

    async createMessage(messageReqDto: MessageReqDto): Promise<void> {

        const message = new Message();
        message.content = messageReqDto.content;
        message.userId = messageReqDto.userId;
        message.createdAt = new Date();
        message.messageId = uuidv4();

        if (!(await this.isExist(messageReqDto.streamId))) {
            this.logger.log('stream does not exist, creating a new stream')

            const streamMessage: StreamMessage = await this.streamMessageRepository.create({
                streamId: messageReqDto.streamId,
            })

            streamMessage.messages = [message];
            this.logger.log(JSON.stringify(streamMessage));

            await this.streamMessageRepository.save(streamMessage);
        } else {
            this.logger.log('stream exists, adding messages to the messages array')
            await this.streamMessageRepository.findOneAndUpdate(
                { streamId: messageReqDto.streamId },
                { $push: { messages: message } }
            );
        }
    }

    async getMessages(streamId: number, page: number, size: number) {

        this.logger.log(`streamId: ${streamId} -- page: ${page} -- size: ${size}`)

        const result = await this.streamMessageRepository.aggregate([
            { $match: { streamId } }, // Filter by streamId
            { $project: { count: { $size: "$messages" } } }
        ]).toArray() as any;

        const count = result.length > 0 ? result[0].count : 0;

        const messages = await this.streamMessageRepository.aggregate([
            { $match: { streamId: streamId } },
            { $unwind: "$messages" },
            { $replaceRoot: { newRoot: "$messages" } },
            { $skip: (page - 1) * size },
            { $limit: size }
        ]).toArray();
        this.logger.log(JSON.stringify(messages));

        return {
            data: messages,
            page,
            size,
            totalItems: count,
            totalPages: Math.ceil(count / size),
        };
    }

    private async isExist(streamId: number): Promise<boolean> {
        const count = await this.streamMessageRepository.count({ streamId })
        this.logger.log(`count: ${count}`)
        return count > 0;
    }
}

