import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import PosCatalogue, {
  IPosCatalogueEntity,
} from "../../entities/catalogues/pos-catalogue.entity";

@injectable()
export class PosCatalogueRepositoryBase extends RepositoryBase<IPosCatalogueEntity> {
  constructor() {
    super(PosCatalogue);
  }
}
