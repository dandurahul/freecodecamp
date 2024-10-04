import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import ExtendedGlobalCatalog, { IExtendedGlobalCatalogEntity } from '../../entities/catalogues/extended-global-catalog.entity';

@injectable()
export class ExtendedGlobalCatalogRepositoryBase extends RepositoryBase<IExtendedGlobalCatalogEntity> {
  constructor() {
    super(ExtendedGlobalCatalog);
  }
}
