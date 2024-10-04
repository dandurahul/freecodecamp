import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import WebCatalogueVariant, {
  IWebCatalogueVariantEntity,
} from "../../entities/catalogues/web-catalogue-variants.entity";

@injectable()
export class WebCatalogueVariantRepositoryBase extends RepositoryBase<IWebCatalogueVariantEntity> {
  constructor() {
    super(WebCatalogueVariant);
  }
}
