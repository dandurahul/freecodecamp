import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import GlobalCataloguePurchaseVariant, {
  IGlobalCataloguePurchaseVariantEntity,
} from '../../entities/catalogues/global-purchase-variants.entity';

@injectable()
export class GlobalCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IGlobalCataloguePurchaseVariantEntity> {
  constructor() {
    super(GlobalCataloguePurchaseVariant);
  }
}
