export interface IRepositoryBase<T> {
  create(data: T): Promise<T>;
  bulkInsert(data: T[], options?: any): Promise<T[]>;
  bulkWrite(data: any[]): Promise<any>;
  findById(query: any): Promise<T>;

  findOne(filter: Partial<T>, populate?: any): Promise<T>;
  find(filter: Partial<T>, fields?: string, populate?: any): Promise<T[]>;
  update(id: any, data: Partial<T>): Promise<T | null>;
  delete(id: any): Promise<void>;
  filter(
    query: Object,
    fields?: string,
    populate?: any,
    aggregate?: any,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<T[]>;
  count(query: any): Promise<any>;
  bulkDelete(query: any): Promise<any>;
  updateMany(query: any, update: any): Promise<any>;
  findOneAndUpdate(query: any, data: Partial<T>): Promise<any>;
}
