import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import type { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
	constructor(private readonly coffeesService: CoffeesService) {}

	@ApiForbiddenResponse({ description: 'Forbidden.' })
	@Get()
	async findAll(
		@ActiveUser() user: ActiveUserData,
		@Query() paginationQuery: PaginationQueryDto,
	) {
		return this.coffeesService.findAll(paginationQuery);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.coffeesService.findOne(id);
	}

	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return this.coffeesService.create(createCoffeeDto);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
		return this.coffeesService.update(id, updateCoffeeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.coffeesService.remove(id);
	}
}
