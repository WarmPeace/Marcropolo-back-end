import { Test, TestingModule } from '@nestjs/testing';
import { LineItemResolver } from './line-item.resolver';
import { LineItemService } from './line-item.service';

describe('LineItemResolver', () => {
  let resolver: LineItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineItemResolver, LineItemService],
    }).compile();

    resolver = module.get<LineItemResolver>(LineItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
