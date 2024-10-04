import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';

export class MediaTypeModel extends BaseModel {
  @Expose()
  media?: string | undefined;
  @Expose()
  thumbnail?: string | undefined;
  @Expose()
  type?: string | undefined;
}
