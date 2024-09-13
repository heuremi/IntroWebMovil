import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateAreaDto {
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    descripcion?: string;
}