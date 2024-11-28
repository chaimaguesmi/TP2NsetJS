import { Test, TestingModule } from '@nestjs/testing';
import { CrudService } from './crud.service';

describe('CrudService', () => {
  let service: CrudService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudService],
    }).compile();

    service = module.get<CrudService<any>>(CrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
