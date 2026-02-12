import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Flavor } from 'src/coffees/entities/flavor.entity';

export class CreateCoffeeDto {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;
  
  @IsArray()
  @IsString({ each: true })
  readonly flavors: Flavor[];
}
