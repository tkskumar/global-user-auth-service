import { Body, Controller, HttpStatus, Logger, Post, Response, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../app/module/services/user.service';
import { AuthService } from './auth.service';
import User  from '../app/module/entities/user.entity';
import { UserDto, UserLoginDto } from './dto/user.dto';

@Controller('/api/auth')
export class AuthController {
    private logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginUser(@Response() res: any, @Body() body: UserLoginDto) {
        this.logger.log('loginUser called');
        const user = await this.userService.getUserByEmail(body.email);

        if (user) {
            if (await this.userService.compareHash(body.password, user.passwordHash)) {
                return res.status(HttpStatus.OK).json(await this.authService.createToken(user.username));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or passwod wrong!' });
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async registerUser(@Response() res: any, @Body() body: UserDto) {
        let user;
        try {
            user = await this.userService.getUserByUsername(body.username);
        } catch (err) {
            this.logger.log('Error in lookup user');
        }

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username already exists!'});
        } else {
            user = await this.userService.createUser(body);
            if (user) {
                user.passwordHash = undefined;
            }
        }

        return res.status(HttpStatus.OK).json(await this.authService.createToken(user.username));
    }
}
