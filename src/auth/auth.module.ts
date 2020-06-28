import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EntityModule } from '../app/module/entity.module';

@Module({
    imports : [
        EntityModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule {
}
