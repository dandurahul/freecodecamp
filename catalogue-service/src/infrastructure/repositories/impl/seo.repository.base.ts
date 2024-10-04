import { injectable } from 'inversify';
import { RepositoryBase } from '../repository-base';
import Seo, { ISeoEntity } from '../entities/iseo.entity';

@injectable()
export class SeoRepositoryBase extends RepositoryBase<ISeoEntity> {
  constructor() {
    super(Seo);
  }
}
