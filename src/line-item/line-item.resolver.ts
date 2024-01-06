import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LineItemService } from './line-item.service';
import { LineItem } from './entities/line-item.entity';
import { CreateLineItemInput } from './dto/create-line-item.input';
import { UpdateLineItemInput } from './dto/update-line-item.input';

@Resolver(() => LineItem)
export class LineItemResolver {
  constructor(private readonly lineItemService: LineItemService) {}

  @Mutation(() => LineItem)
  createLineItem(
    @Args('createLineItemInput') createLineItemInput: CreateLineItemInput,
  ) {
    // return this.lineItemService.create(createLineItemInput);
  }

  @Query(() => [LineItem], { name: 'lineItem' })
  findAll() {
    return this.lineItemService.findAll();
  }

  @Query(() => [LineItem])
  async findLineItemsByOrderId(@Args('id', { type: () => Int }) id: number) {
    const data = await this.lineItemService.findByOrderId(id);
    return data;
  }

  @Mutation(() => LineItem)
  updateLineItem(
    @Args('updateLineItemInput') updateLineItemInput: UpdateLineItemInput,
  ) {
    return this.lineItemService.update(
      updateLineItemInput.id,
      updateLineItemInput,
    );
  }

  @Mutation(() => LineItem)
  removeLineItem(@Args('id', { type: () => Int }) id: number) {
    return this.lineItemService.remove(id);
  }
}
