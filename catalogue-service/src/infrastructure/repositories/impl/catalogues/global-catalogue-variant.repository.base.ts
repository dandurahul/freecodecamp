import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import GlobalCatalogueVariant, {
  IGlobalCatalogueVariantEntity,
} from '../../entities/catalogues/global-catalogue-variants.entity';

@injectable()
export class GlobalCatalogueVariantRepositoryBase extends RepositoryBase<IGlobalCatalogueVariantEntity> {
  constructor() {
    super(GlobalCatalogueVariant);
  }
}
