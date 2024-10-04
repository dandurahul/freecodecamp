import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import ProductHighlight, {
  IProductHighlightEntity,
} from '../../entities/categories/product-highlight.entity';

@injectable()
export class ProductHighlightRepositoryBase extends RepositoryBase<IProductHighlightEntity> {
  constructor() {
    super(ProductHighlight);
  }
}
