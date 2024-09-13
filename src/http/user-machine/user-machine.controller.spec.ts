import { Test, TestingModule } from '@nestjs/testing';
import { UserMachineController } from './user-machine.controller';
import { UserMachineService } from './user-machine.service';

describe('UserMachineController', () => {
  let controller: UserMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMachineController],
      providers: [UserMachineService],
    }).compile();

    controller = module.get<UserMachineController>(UserMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
