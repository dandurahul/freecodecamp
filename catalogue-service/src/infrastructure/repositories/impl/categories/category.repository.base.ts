import Category, {
  ICategoryEntity,
} from '../../entities/categories/category.entity';
import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';

@injectable()
export class CategoryRepositoryBase extends RepositoryBase<ICategoryEntity> {
  constructor() {
    super(Category);
  }
}
