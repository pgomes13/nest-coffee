import { Controller, Get, Param, Post, Body, HttpStatus, HttpCode, Res, Patch, Delete } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
	@Get()
  findAll(@Res() response) {
    response.status(HttpStatus.OK).send('This action returns all the coffees');
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
