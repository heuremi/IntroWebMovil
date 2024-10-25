import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateMachineDto {
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    descripcion?: string;
}
