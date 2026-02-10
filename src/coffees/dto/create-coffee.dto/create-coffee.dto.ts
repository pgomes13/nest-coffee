import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateCoffeeDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;
  
  @IsArray({ each: true })
  readonly flavors: string[];
}
