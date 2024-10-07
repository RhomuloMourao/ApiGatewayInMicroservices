import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { OrderController } from './order.controller';

@Module({
  controllers: [AuthController, UserController, OrderController],
})
export class AppModule {}
