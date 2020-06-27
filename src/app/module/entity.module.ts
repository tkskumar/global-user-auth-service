import { Module, Type } from '@nestjs/common';
import ItemsService from './services/item.servie';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContactEntity from './entity/contact.entity';
import { DatabaseModule } from '../../database/database.module';
import * as fs from 'fs';
import * as path from 'path';

export const ALL_ENTITIES = fs.readdirSync(path.join(path.dirname(__filename), 'entity'))
  .map((file) => require(`./entity/${file}`).default as Type<any>);

@Module({
  imports: [
  DatabaseModule.forRoot({ entities: ALL_ENTITIES}),
  TypeOrmModule.forFeature([ContactEntity]),
  ],
  providers: [ItemsService],
  exports : [ItemsService],
  controllers: []
})
export class EntityModule {}
