import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import WebCatalogue, {
  IWebCatalogueEntity,
} from "../../entities/catalogues/web-catalogues.entity";

@injectable()
export class WebCatalogueRepositoryBase extends RepositoryBase<IWebCatalogueEntity> {
  constructor() {
    super(WebCatalogue);
  }
}
