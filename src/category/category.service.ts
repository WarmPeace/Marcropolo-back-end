import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const category = this.categoryRepository.create(createCategoryInput);
    await this.categoryRepository.save(category);
    return category;
  }

  async findCategoryBySearch(search: string, sort: string, sortType: string) {
    const sql =
      ' SELECT * FROM category WHERE isDelete = 0 AND name LIKE "%' +
      search +
      '%" ORDER BY ' +
      sort +
      ' ' +
      sortType;
    return await this.categoryRepository.query(sql);
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    const newProductCategory =
      this.categoryRepository.create(updateCategoryInput);
    await this.categoryRepository.update(
      updateCategoryInput.id,
      newProductCategory,
    );
    return newProductCategory;
  }

  async remove(id: number) {
    const deleteCategory = await this.categoryRepository.findOneBy({
      id,
    });
    deleteCategory.isDelete = 1;
    await this.categoryRepository.update(id, deleteCategory);
    return deleteCategory;
  }
}
