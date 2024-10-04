import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';

import SizeMaster, { ISizeMasterEntity } from '../../entities/size-master/size-master.entity';
import Dimension, { IDimensionEntity } from '../../entities/size-master/dimension.entity';

@injectable()
export class DimensionRepositoryBase extends RepositoryBase<IDimensionEntity> {
    constructor() {
        super(Dimension);
    }
}
