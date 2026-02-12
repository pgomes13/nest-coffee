import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

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
  readonly flavors: string[];
}
