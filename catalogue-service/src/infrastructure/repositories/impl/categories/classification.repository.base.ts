import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import Classification, {
  IClassificationEntity,
} from '../../entities/categories/classification.entity';

@injectable()
export class ClassificationRepositoryBase extends RepositoryBase<IClassificationEntity> {
  constructor() {
    super(Classification);
  }
}
