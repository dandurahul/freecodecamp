import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import AndroidCatalogue, {
  IAndroidCatalogueEntity,
} from '../../entities/catalogues/android-catalogue.entity';

@injectable()
export class AndroidCatalogueRepositoryBase extends RepositoryBase<IAndroidCatalogueEntity> {
  constructor() {
    super(AndroidCatalogue);
  }
}
