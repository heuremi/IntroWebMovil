import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMachineDto {
  @IsNotEmpty()
  @IsString()
  brand?: string;

  @IsNotEmpty()
  @IsString()
  _model?: string;

  @IsNotEmpty()
  @IsNumber()
  year?: number;

  @IsNotEmpty()
  @IsString()
  licencePlate?: string;

  @IsNotEmpty()
  @IsString()
  area?: string;
}
