import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import IosCatalogueVariant, {
  IIosCatalogueVariantEntity,
} from "../../entities/catalogues/ios-catalogue-variants.entity";

@injectable()
export class IosCatalogueVariantRepositoryBase extends RepositoryBase<IIosCatalogueVariantEntity> {
  constructor() {
    super(IosCatalogueVariant);
  }
}
