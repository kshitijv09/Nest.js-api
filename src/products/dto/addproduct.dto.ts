import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
