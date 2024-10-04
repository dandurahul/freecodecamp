import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import PosCatalogueVariant, {
  IPosCatalogueVariantEntity,
} from "../../entities/catalogues/pos-catalogue-varint.entity";

@injectable()
export class PosCatalogueVariantRepositoryBase extends RepositoryBase<IPosCatalogueVariantEntity> {
  constructor() {
    super(PosCatalogueVariant);
  }
}
