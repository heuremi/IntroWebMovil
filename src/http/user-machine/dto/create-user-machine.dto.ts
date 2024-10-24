import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserMachineDto {
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    descripcion?: string;
}