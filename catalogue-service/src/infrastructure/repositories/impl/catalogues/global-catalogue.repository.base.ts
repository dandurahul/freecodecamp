import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import GlobalCatalogue, {
  IGlobalCatalogueEntity,
} from '../../entities/catalogues/global-catalogues.entity';

@injectable()
export class GlobalCatalogueRepositoryBase extends RepositoryBase<IGlobalCatalogueEntity> {
  constructor() {
    super(GlobalCatalogue);
  }
}
