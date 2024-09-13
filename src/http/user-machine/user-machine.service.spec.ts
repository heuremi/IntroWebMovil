import { Test, TestingModule } from '@nestjs/testing';
import { UserMachineService } from './user-machine.service';

describe('UserMachineService', () => {
  let service: UserMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMachineService],
    }).compile();

    service = module.get<UserMachineService>(UserMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
