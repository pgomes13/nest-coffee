import { Optional } from '@nestjs/common';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
	@IsNumber()
	@IsOptional()
	@IsPositive()
	limit: number;

	@IsNumber()
	@IsOptional()
	@IsPositive()
	offset: number;
}
