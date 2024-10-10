import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MessageReqDto {
  @IsNumber()
  @IsNotEmpty()
  streamId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
