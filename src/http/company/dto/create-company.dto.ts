import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateCompanyDto {
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    descripcion?: string;
}