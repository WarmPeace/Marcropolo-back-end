import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { CreateGroupPriceInput } from './dto/create-groupPrice.input';
import { GroupPost } from './entities/groupPost.entity';
import { CreateGroupPostInput } from './dto/create-groupPost.input';
import { UpdateGroupPriceInput } from './dto/update-groupPrice.input';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Args({
      name: 'createVariantInput',
      type: () => [CreateVariantInput],
    })
    createVariantInput: CreateVariantInput[],
    @Args({
      name: 'createGroupPriceInput',
      type: () => [CreateGroupPriceInput],
    })
    createGroupPriceInput: CreateGroupPriceInput[],
  ) {
    const product = await this.productService.create(
      createProductInput,
      createVariantInput,
      createGroupPriceInput,
    );
    return product;
  }

  @Query(() => [Product])
  async getProducts(
    @Args('search') search: string,
    @Args('sort') sort: string,
    @Args('sortType') sortType: string,
  ) {
    return this.productService.findProductsBySearch(search, sort, sortType);
  }

  @Query(() => [Product])
  async getProductsByUser(
    @Args('type', { type: () => Int }) type: number,
    @Args('minPrice', { type: () => Int }) minPrice: number,
    @Args('maxPrice', { type: () => Int }) maxPrice: number,
    @Args('category', { type: () => Int }) category: number,
  ) {
    return this.productService.findProductsByUser(
      type,
      minPrice,
      maxPrice,
      category,
    );
  }

  @Query(() => Product)
  async getProductById(@Args('id', { type: () => Int }) id: number) {
    return await this.productService.findOne(id);
  }

  @Mutation(() => GroupPost)
  async createGroupPost(
    @Args('createGroupPostInput') createGroupPostInput: CreateGroupPostInput,
  ) {
    const groupPost = await this.productService.createGroupPost(
      createGroupPostInput,
    );
    return groupPost;
  }

  @Query(() => [GroupPost])
  async getGroupPosts(@Args('sort') sort: string) {
    return await this.productService.getGroupPosts(sort);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @Args({
      name: 'updateVariantInput',
      type: () => [UpdateVariantInput],
    })
    updateVariantInput: UpdateVariantInput[],
    @Args({
      name: 'updateGroupPriceInput',
      type: () => [UpdateGroupPriceInput],
    })
    updateGroupPriceInput: UpdateGroupPriceInput[],
  ) {
    return await this.productService.update(
      updateProductInput,
      updateVariantInput,
      updateGroupPriceInput,
    );
  }

  @Mutation(() => Product)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    const data = await this.productService.remove(id);
    return data;
  }
}
