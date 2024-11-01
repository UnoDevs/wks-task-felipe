import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async singIn(email: string, pass: string): Promise<any>{
        const user = await this.usersService.findOneUser(email);
        if (user?.password !== pass){
                throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    
}
