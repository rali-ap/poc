import { Body, Controller, DefaultValuePipe, Get, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageReqDto } from 'src/dto/message-req.dto';

@Controller('messages')
export class MessageController {

    private readonly logger = new Logger(MessageController.name)

    constructor(private readonly messageService: MessageService) { }

    @Post()
    async createMessage(@Body() messageReqDto: MessageReqDto): Promise<void> {
        this.messageService.createMessage(messageReqDto);
    }

    @Get()
    async getMessages(
        @Query('streamId') streamId: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,  // default value and parse
        @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number // default value and parse
    ) {
        return this.messageService.getMessages(Number(streamId), Number(page), Number(size));
    }

}
