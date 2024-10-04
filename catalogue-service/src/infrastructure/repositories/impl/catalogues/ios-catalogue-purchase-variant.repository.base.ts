import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import IosCataloguePurchaseVariant, {
  IIosCataloguePurchaseVariantEntity,
} from "../../entities/catalogues/ios-purchase-variants.entity";

@injectable()
export class IosCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IIosCataloguePurchaseVariantEntity> {
  constructor() {
    super(IosCataloguePurchaseVariant);
  }
}
