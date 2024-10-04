import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import StoreCatalogueVariant, {
  IStoreCatalogueVariantEntity,
} from '../../entities/catalogues/store-catalogue-variants.entity';

@injectable()
export class StoreCatalogueVariantRepositoryBase extends RepositoryBase<IStoreCatalogueVariantEntity> {
  constructor() {
    super(StoreCatalogueVariant);
  }
}
