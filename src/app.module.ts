import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "mongoDataSource",
      type: 'mongodb',
      url: 'mongodb://admin:w3!come2024@localhost:27017/poc?authSource=admin',
      entities: [__dirname + '/**/*.entity.mongo{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'postgresDataSource',
      type: 'postgres',
      host: 'localhost',    
      port: 5432,            
      username: 'admin', 
      password: 'w3!come2024', 
      database: 'poc',  
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,    
    }),
    MessageModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
