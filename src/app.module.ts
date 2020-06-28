import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { EntityModule } from './app/module/entity.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { JwksRsaModule } from './jwks-rsa/jwks-rsa.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwksRsaModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule,
    JwksRsaModule,
    EntityModule,
    LoggerModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
