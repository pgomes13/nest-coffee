import { Controller, Get, Param, Post, Body, HttpStatus, HttpCode, Res, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
	@Get()
  findAll(@Query() paginationQuery) {
		const { limit, offset } = paginationQuery;
		return `This action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return `This action returns a #${id} coffee`;
	}

	@Post()
	@HttpCode(HttpStatus.GONE)
	create(@Body() body) {
		return body;
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() body) {
		return `This action updates a #${id} coffee`;
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return `This action removes #${id} coffee`;
	}
}
