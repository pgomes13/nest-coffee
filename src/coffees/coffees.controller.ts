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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Permissions } from '../iam/authorization/decorators/permissions.decorator';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Permission } from '../iam/authorization/permission.type';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import type { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Role } from '../users/enums/role.enum';
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

	// @Roles(Role.Admin)
	@Permissions(Permission.CreateCoffee)
	@Post()
	create(@Body() createCoffeeDto: CreateCoffeeDto) {
		return this.coffeesService.create(createCoffeeDto);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
		return this.coffeesService.update(id, updateCoffeeDto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.coffeesService.remove(id);
	}
}
