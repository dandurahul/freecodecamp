import { ISeoEntity } from '../entities/iseo.entity';

export interface ISeoRepository {
  createSeo(SeoEntity: ISeoEntity): Promise<ISeoEntity>;

  getSeo(query: any): Promise<ISeoEntity>;
  getAllSeos(query: any): Promise<ISeoEntity[]>;
  updateSeo(id: string, SeoEntity: ISeoEntity): Promise<ISeoEntity>;
  deleteSeo(id: string): Promise<void>;
  filterSeo(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<ISeoEntity[]>;
}
