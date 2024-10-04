import { injectable } from 'inversify';
import MediaType, { IMediaTypeEntity } from '../entities/imedia-type.entity';
import { RepositoryBase } from '../repository-base';

@injectable()
export class MediaTypeRepositoryBase extends RepositoryBase<IMediaTypeEntity> {
  constructor() {
    super(MediaType);
  }
}
