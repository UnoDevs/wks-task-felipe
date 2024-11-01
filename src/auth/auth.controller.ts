import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './DTO/auth.dto';
import { Public } from './auth.decorator';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Public()
    @Post('login')
    signIn(@Body() signInDto: AuthDTO) {
      return this.authService.singIn(signInDto.email, signInDto.password);
    }
}
