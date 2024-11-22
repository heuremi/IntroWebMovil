import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserMachineService } from './user-machine.service';
import { CreateUserMachineDto } from './dto/create-user-machine.dto';
import { UpdateUserMachineDto } from './dto/update-user-machine.dto';
import { DeleteResult } from 'mongodb';


@Controller('user-machine')
export class UserMachineController {
  constructor(private readonly userMachineService: UserMachineService) {}

  @Post()
  create(@Body() createUserMachineDto: CreateUserMachineDto) {
    return this.userMachineService.create(createUserMachineDto);
  }

  @Get()
  async findAll() {
    return this.userMachineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userMachineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMachineDto: UpdateUserMachineDto) {
    return this.userMachineService.update(id, updateUserMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<DeleteResult> {
    return this.userMachineService.remove(id);
  }

  @Get('user/:userId/machines')
  async findMachinesByUser(@Param('userId') userId: string) {
    return this.userMachineService.findMachinesByUser(userId);
  } 
}