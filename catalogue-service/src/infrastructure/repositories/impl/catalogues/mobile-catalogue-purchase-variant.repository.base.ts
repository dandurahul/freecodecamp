import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import MobileCataloguePurchaseVariant, {
  IMobileCataloguePurchaseVariantEntity,
} from "../../entities/catalogues/mobile-purchase-variants.entity";

@injectable()
export class MobileCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IMobileCataloguePurchaseVariantEntity> {
  constructor() {
    super(MobileCataloguePurchaseVariant);
  }
}
