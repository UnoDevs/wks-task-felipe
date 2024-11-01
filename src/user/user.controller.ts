import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserDTO} from "./DTO/user.dto";
import { Public } from "src/auth/auth.decorator";

@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    @Public()
    @Get()
    find() {
        return this.userRepository.find();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.userRepository.findBy({ id: id });
    }

    @Post()
    create(@Body() userDTO: UserDTO) {
        const user = this.userRepository.create(userDTO);
        this.userRepository.save(user);
    }

    @Put(':id')
    async update(@Param('id') id:number, @Body() userDTO: UserDTO){
        const user = await this.userRepository.findOneBy({id});
        if(user === null){
            throw new NotFoundException(`Usuário com id '${id}' não encontrada`);
        }

        user.name = userDTO.name;
        user.email = userDTO.email;
        user.funct = userDTO.funct;
        user.isActive = user.isActive;

        return this.userRepository.save(user);
    }

    @Delete(':id')
    async delete(@Param('id') id:number){
        await this.userRepository.delete(id);
    }
}