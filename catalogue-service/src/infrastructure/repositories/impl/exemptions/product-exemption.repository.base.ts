import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import ProductExemption, {
  IProductExemptionEntity,
} from '../../entities/exemptions/product-exemptions.entity';

@injectable()
export class ProductExemptionRepositoryBase extends RepositoryBase<IProductExemptionEntity> {
  constructor() {
    super(ProductExemption);
  }
}
