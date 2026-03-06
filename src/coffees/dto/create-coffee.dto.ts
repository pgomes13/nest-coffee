import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateCoffeeDto {
	@ApiProperty({ description: 'The name of the coffee' })
	@IsString()
	readonly name1: string;

	@ApiProperty({ description: 'The brand of the coffee' })
	@IsString()
	readonly brand: string;

	@ApiProperty({ description: 'The flavors of the coffee' })
	@IsArray()
	@IsString({ each: true })
	readonly flavors: string[];
}
