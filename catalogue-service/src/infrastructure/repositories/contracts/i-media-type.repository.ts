import { IMediaTypeEntity } from "../entities/imedia-type.entity";

export interface IMediaTypeRepository {
  createMediaType(MediaTypeEntity: IMediaTypeEntity): Promise<IMediaTypeEntity>;
  bulkCreate(media: IMediaTypeEntity[]): Promise<IMediaTypeEntity[]>;
  getMediaType(query: any): Promise<IMediaTypeEntity>;
  getAllMediaTypes(query: any): Promise<IMediaTypeEntity[]>;
  updateMediaType(
    id: string,
    MediaTypeEntity: IMediaTypeEntity
  ): Promise<IMediaTypeEntity>;
  deleteMediaType(id: string): Promise<void>;
  filterMediaType(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IMediaTypeEntity[]>;
}
