import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CategoryDTO } from "./DTO/category.dto";

@Controller('category')
export class CategoryController {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    @Get()
    find() {
        return this.categoryRepository.find();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.categoryRepository.findBy({ id: id });
    }

    @Post()
    create(@Body() categoryDTO: CategoryDTO) {
        const category = this.categoryRepository.create(categoryDTO);
        this.categoryRepository.save(category);
    }

    @Put(':id')
    async update(@Param('id') id:number, @Body() categoryDTO: CategoryDTO){
        const category = await this.categoryRepository.findOneBy({id});
        if(category === null){
            throw new NotFoundException(`Categoria com id '${id}' não encontrada`);
        }

        category.name = categoryDTO.name;
        category.description = categoryDTO.description;
        category.isActive = category.isActive;

        return this.categoryRepository.save(category);
    }

    @Delete(':id')
    async delete(@Param('id') id:number){
        await this.categoryRepository.delete(id);
    }
}