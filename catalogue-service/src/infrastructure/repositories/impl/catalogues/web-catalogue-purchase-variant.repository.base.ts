import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import WebCataloguePurchaseVariant, {
  IWebCataloguePurchaseVariantEntity,
} from "../../entities/catalogues/web-purchase-variants.entity";

@injectable()
export class WebCataloguePurchaseVariantRepositoryBase extends RepositoryBase<IWebCataloguePurchaseVariantEntity> {
  constructor() {
    super(WebCataloguePurchaseVariant);
  }
}
