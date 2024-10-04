import SubCategory, {
  ISubCategoryEntity,
} from '../../entities/categories/sub-category.entity';
import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';

@injectable()
export class SubCategoryRepositoryBase extends RepositoryBase<ISubCategoryEntity> {
  constructor() {
    super(SubCategory);
  }
}
