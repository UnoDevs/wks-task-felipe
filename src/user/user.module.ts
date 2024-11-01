import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from './user.service';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/auth.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
    exports: [UserService]
})
export class UserModule {}