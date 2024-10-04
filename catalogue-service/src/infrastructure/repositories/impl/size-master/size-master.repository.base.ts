import { injectable } from 'inversify';
import { RepositoryBase } from '../../repository-base';

import SizeMaster, { ISizeMasterEntity } from '../../entities/size-master/size-master.entity';

@injectable()
export class SizeMasterRepositoryBase extends RepositoryBase<ISizeMasterEntity> {
    constructor() {
        super(SizeMaster);
    }
}
