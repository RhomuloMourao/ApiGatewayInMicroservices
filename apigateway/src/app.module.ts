import { Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { OrderController } from './order.controller';
@Module({
  imports: [
    CacheModule.register({
      ttl: 120, // Tempo de expiração em segundos
      max: 100, // Número máximo de itens no cache
    }),
  ],
  controllers: [AuthController, UserController, OrderController],
  providers: [Logger],
})
export class AppModule {}
