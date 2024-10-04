import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import AndroidCatalogueVariant, {
  IAndroidCatalogueVariantEntity,
} from "../../entities/catalogues/android-catalogue-variant.entity";

@injectable()
export class AndroidCatalogueVariantRepositoryBase extends RepositoryBase<IAndroidCatalogueVariantEntity> {
  constructor() {
    super(AndroidCatalogueVariant);
  }
}
