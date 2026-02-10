import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
	private coffees: Coffee[] = [
		{
			id: 1,
			name: 'Shipwreck Roast',
			brand: 'Buddy Brew',
			flavors: ['chocolate', 'vanilla']
		},
	]

	findAll() {
		return this.coffees;
	}

	findOne(id: number) {
		const coffee = this.coffees.find(item => item.id === +id);
		if (!coffee) {
			throw new NotAcceptableException(`Coffee #${id} not found`);
		}
		return coffee;
	}

	create(createCoffeeDto: Coffee) {
		this.coffees.push(createCoffeeDto);
	}

	update(id: number, updateCoffeeDto: Coffee) {
		const existingCoffee = this.findOne(id);
		if (existingCoffee) {
			// update the existing coffee with the new values
			Object.assign(existingCoffee, updateCoffeeDto);
		}
	}

	remove(id: number) {
		const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
		if (coffeeIndex >= 0) {
			this.coffees.splice(coffeeIndex, 1);
		}
	}
}