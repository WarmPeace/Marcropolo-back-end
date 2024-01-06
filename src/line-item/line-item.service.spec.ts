import { Test, TestingModule } from '@nestjs/testing';
import { LineItemService } from './line-item.service';

describe('LineItemService', () => {
  let service: LineItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineItemService],
    }).compile();

    service = module.get<LineItemService>(LineItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
