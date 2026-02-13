import {
	Injectable,
	NotAcceptableException,
	NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
	constructor(
		@InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
		@InjectConnection() private readonly connection: Connection,
		@InjectModel(Event.name) private readonly eventModel: Model<Event>,
	) {
		console.log('CoffeesService instance created');
	}

	findAll(paginationQuery: PaginationQueryDto) {
		const { limit, offset } = paginationQuery;
		return this.coffeeModel.find().limit(limit).skip(offset).exec();
	}

	findOne(id: string) {
		const coffee = this.coffeeModel.findOne({ _id: id }).exec();
		if (!coffee) {
			throw new NotAcceptableException(`Coffee #${id} not found`);
		}
		return coffee;
	}

	create(createCoffeeDto: CreateCoffeeDto) {
		const coffee = new this.coffeeModel(createCoffeeDto);
		return coffee.save();
	}

	async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
		const existingCoffee = await this.coffeeModel
			.findByIdAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
			.exec();

		if (!existingCoffee) {
			throw new NotFoundException(`Coffee #${id} not found`);
		}

		return existingCoffee;
	}

	async remove(id: string) {
		return await this.coffeeModel.findByIdAndDelete({ _id: id }).exec();
	}

	async recommendCoffee(coffee: Coffee) {
		const session = await this.connection.startSession();

		try {
			session.startTransaction();
			coffee.recommendations++;

			const recommendEvent = new this.eventModel({
				name: 'recommend_coffee',
				type: 'coffee',
				payload: { coffeeId: coffee._id },
			});

			await recommendEvent.save({ session });
			await coffee.save({ session });

			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
		} finally {
			session.endSession();
		}
	}
}
