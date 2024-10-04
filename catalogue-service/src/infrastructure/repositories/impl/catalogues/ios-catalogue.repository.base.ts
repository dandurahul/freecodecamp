import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import IosCatalogue, {
  IIosCatalogueEntity,
} from "../../entities/catalogues/ios-catalogue.entity";

@injectable()
export class IosCatalogueRepositoryBase extends RepositoryBase<IIosCatalogueEntity> {
  constructor() {
    super(IosCatalogue);
  }
}
