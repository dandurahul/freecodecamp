import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import StoreCatalogue, {
  IStoreCatalogueEntity,
} from '../../entities/catalogues/store-catalogues.entity';

@injectable()
export class StoreCatalogueRepositoryBase extends RepositoryBase<IStoreCatalogueEntity> {
  constructor() {
    super(StoreCatalogue);
  }
}
