import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { OrderController } from './order.controller';
import { Logger } from '@nestjs/common';
import { JwtAuthMiddleware } from './jwt-auth.middleware';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 5, // 5 segundos de TTL para cache
      max: 100, // Número máximo de itens no cache
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Intervalo de 60 segundos
          limit: 3, // Limite de 3 requisições por intervalo
        },
      ],
    }),

    // Módulo HTTP (Axios para fazer requisições para microsserviços)
    HttpModule.register({
      timeout: 5000, // Timeout para requisições
      maxRedirects: 5, // Máximo de redirects
    }),
  ],
  controllers: [AuthController, UserController, OrderController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Aplica o middleware de autenticação
      .exclude(
        // Exclui as rotas de login e register
        { path: 'v1/auth/register', method: RequestMethod.POST },
        { path: 'v1/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*'); // Aplica para todas as outras rotas
  }
}
