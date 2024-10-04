import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import MobileCatalogue, {
  IMobileCatalogueEntity,
} from "../../entities/catalogues/mobile-catalogues.entity";

@injectable()
export class MobileCatalogueRepositoryBase extends RepositoryBase<IMobileCatalogueEntity> {
  constructor() {
    super(MobileCatalogue);
  }
}
