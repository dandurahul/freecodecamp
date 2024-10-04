import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import PosCataloguePurchaseVariant, {
  IPosCataloguePurchaseVariantEntity,
} from "../../entities/catalogues/pos-purchase-variants.entity";

@injectable()
export class PosCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IPosCataloguePurchaseVariantEntity> {
  constructor() {
    super(PosCataloguePurchaseVariant);
  }
}
