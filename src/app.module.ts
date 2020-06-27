import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { EntityModule } from './app/module/entity.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { ItemsController } from './app/controllers/item.controller';
import {GraphqlModule} from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule,
    EntityModule,
    LoggerModule
  ],
  controllers: [AppController, ItemsController]
})
export class AppModule {
}
