import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
	constructor(
		@InjectRepository(Coffee)
		private readonly coffeeRepository: Repository<Coffee>,
	) {}

	findAll() {
		return this.coffeeRepository.find();
	}

	async findOne(id: number) {
		const coffee = await this.coffeeRepository.findOneBy({ id });
		if (!coffee) {
			throw new NotAcceptableException(`Coffee #${id} not found`);
		}
		return coffee;
	}

	create(createCoffeeDto: CreateCoffeeDto) {
		const coffee = this.coffeeRepository.create(createCoffeeDto);
		return this.coffeeRepository.save(coffee);
	}

	async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
		const coffee = await this.coffeeRepository.preload({
			id: +id,
			...updateCoffeeDto,
		});
		if (!coffee) {
			throw new NotAcceptableException(`Coffee #${id} not found`);
		}
		// update the existing coffee with the new values
		return this.coffeeRepository.save(coffee);
	}

	async remove(id: number) {
		const coffee = await this.findOne(id);
		return this.coffeeRepository.remove(coffee);
	}
}