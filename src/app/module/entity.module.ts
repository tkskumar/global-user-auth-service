import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../database/database.module';
import * as fs from 'fs';
import * as path from 'path';
import User  from './entities/user.entity';
import { UserService } from './services/user.service';

export const ALL_ENTITIES = fs.readdirSync(path.join(path.dirname(__filename), 'entities'))
  .map((file) => require(`./entities/${file}`).default as Type<any>);

@Module({
  imports: [
  DatabaseModule.forRoot({ entities: ALL_ENTITIES}),
  TypeOrmModule.forFeature([User]),

  ],
  providers: [UserService],
  exports : [UserService],
  controllers: []
})
export class EntityModule {}
