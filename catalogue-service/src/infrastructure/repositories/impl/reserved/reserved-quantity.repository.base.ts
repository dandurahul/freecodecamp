import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';
import ReservedQuantity, {
  IReservedQuantityEntity,
} from '../../entities/reserved/reserved-quantity.entity';

@injectable()
export class ReservedQuantityRepositoryBase extends RepositoryBase<IReservedQuantityEntity> {
  constructor() {
    super(ReservedQuantity);
  }
}
