import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import AndroidCataloguePurchaseVariant, {
  IAndroidCataloguePurchaseVariantEntity,
} from "../../entities/catalogues/android-catalogue-purchase-variant.entity";

@injectable()
export class AndroidCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IAndroidCataloguePurchaseVariantEntity> {
  constructor() {
    super(AndroidCataloguePurchaseVariant);
  }
}
