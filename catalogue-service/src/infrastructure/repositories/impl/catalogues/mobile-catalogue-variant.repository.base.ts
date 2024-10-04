import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import MobileCatalogueVariant, {
  IMobileCatalogueVariantEntity,
} from "../../entities/catalogues/mobile.catalogue-variants.entity";

@injectable()
export class MobileCatalogueVariantRepositoryBase extends RepositoryBase<IMobileCatalogueVariantEntity> {
  constructor() {
    super(MobileCatalogueVariant);
  }
}
