import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import StoreCataloguePurchaseVariant, {
  IStoreCataloguePurchaseVariantEntity,
} from '../../entities/catalogues/store-purchase-variants.entity';

@injectable()
export class StoreCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IStoreCataloguePurchaseVariantEntity> {
  constructor() {
    super(StoreCataloguePurchaseVariant);
  }
}
