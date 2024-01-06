import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateVariantInput } from './dto/create-variant.input';
import { Variant } from './entities/variant.entity';
import { CreateGroupPriceInput } from './dto/create-groupPrice.input';
import { GroupPrice } from './entities/groupPrice.entity';
import { GroupPost } from './entities/groupPost.entity';
import { CreateGroupPostInput } from './dto/create-groupPost.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { UpdateGroupPriceInput } from './dto/update-groupPrice.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Variant) private variantRepository: Repository<Variant>,
    @InjectRepository(GroupPrice)
    private groupPriceRepository: Repository<GroupPrice>,
    @InjectRepository(GroupPost)
    private groupPostRepository: Repository<GroupPost>,
  ) {}

  async create(
    createProductInput: CreateProductInput,
    createVariantInput: CreateVariantInput[],
    createGroupPriceInput: CreateGroupPriceInput[],
  ) {
    const newProduct = this.productRepository.create(createProductInput);
    await this.productRepository.save(newProduct);
    for (let i = 0; i < createVariantInput.length; i++) {
      const newVariant = this.variantRepository.create(createVariantInput[i]);
      newVariant.product = newProduct;
      this.variantRepository.save(newVariant);
    }
    for (let i = 0; i < createGroupPriceInput.length; i++) {
      const newGroupPrice = this.groupPriceRepository.create(
        createGroupPriceInput[i],
      );
      newGroupPrice.product = newProduct;
      this.groupPriceRepository.save(newGroupPrice);
    }
    return newProduct;
  }

  async createGroupPost(createGroupPostInput: CreateGroupPostInput) {
    const newGroupPost = this.groupPostRepository.create(createGroupPostInput);
    await this.groupPostRepository.save(newGroupPost);
    return newGroupPost;
  }

  async getGroupPosts(sort: string) {
    const data = await this.groupPostRepository
      .createQueryBuilder('group_post')
      .orderBy('group_post.' + sort, 'DESC')
      .getMany();
    return data;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const data = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        category: true,
        variants: true,
        groupPrices: true,
        groupPosts: true,
      },
    });
    return data;
  }

  async findProductsBySearch(search: string, sort: string, sortType: string) {
    const data = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category.product')
      .orderBy('product.' + sort, sortType == 'asc' ? 'ASC' : 'DESC')
      .getMany();
    return data;
  }

  async findProductsByUser(
    type: number,
    minPrice: number,
    maxPrice: number,
    category: number,
  ) {
    if (maxPrice == 0) {
      return this.productRepository.findBy({
        type: Equal(type),
        categoryId: category,
      });
    } else {
      return this.productRepository.findBy({
        type: Equal(type),
        categoryId: category,
        // price: Between(minPrice, maxPrice),
      });
    }
  }

  async update(
    updateProductInput: UpdateProductInput,
    updateVariantInput: UpdateVariantInput[],
    updateGroupPriceInput: UpdateGroupPriceInput[],
  ) {
    const updateProduct = this.productRepository.create(updateProductInput);
    await this.productRepository.update(updateProductInput.id, updateProduct);
    const deleteVariants = await this.variantRepository.find({
      where: { productId: updateProductInput.id },
    });
    await this.variantRepository.remove(deleteVariants);
    for (let i = 0; i < updateVariantInput.length; i++) {
      const updateVariant = this.variantRepository.create(
        updateVariantInput[i],
      );
      updateVariant.product = updateProduct;
      this.variantRepository.save(updateVariant);
    }
    const deleteGroupPrices = await this.groupPriceRepository.find({
      where: { productId: updateProductInput.id },
    });
    await this.groupPriceRepository.remove(deleteGroupPrices);
    for (let i = 0; i < updateGroupPriceInput.length; i++) {
      const updateGroupPrice = this.groupPriceRepository.create(
        updateGroupPriceInput[i],
      );
      updateGroupPrice.product = updateProduct;
      this.groupPriceRepository.save(updateGroupPrice);
    }
    return updateProduct;
  }

  async remove(id: number) {
    const deleteProduct = await this.productRepository.findOneBy({ id });
    await this.productRepository.remove(deleteProduct);
    return deleteProduct;
  }
}
