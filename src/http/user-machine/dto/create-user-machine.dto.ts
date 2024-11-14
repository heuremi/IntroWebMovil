import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserMachineDto {
    @IsNotEmpty()
    idUser?: String;

    @IsNotEmpty()
    idMachine?: string;
}