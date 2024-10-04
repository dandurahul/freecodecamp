import "reflect-metadata";
import { injectable, unmanaged as _unmanaged } from "inversify";
import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { IRepositoryBase } from "./contracts/base/i-repository-base";

export const unmanaged = _unmanaged as () => (
  target: DecoratorTarget,
  targetKey: string | undefined,
  index: number
) => void;

@injectable()
export class RepositoryBase<T> implements IRepositoryBase<T> {
  protected model: mongoose.Model<T>;
  constructor(@unmanaged() entityName: mongoose.Model<any>) {
    this.model = entityName as mongoose.Model<T>;
  }
  public async findById(query: any): Promise<T> {
    return (await this.model.findById(query).exec()) as unknown as Promise<T>;
  }

  public async findOne<T>(selectQuery: Partial<T>, populate: any): Promise<T> {
    return this.model
      .findOne(selectQuery as FilterQuery<T>)
      .populate(populate || "")
      .exec() as Promise<T>;
  }

  public async create<T>(data: T): Promise<T> {
    const newRecord = new this.model(data);
    return newRecord.save() as Promise<T>;
  }

  public bulkInsert = (data: T[], options?: any): Promise<T[]> => {
    if (options) return this.model.insertMany(data, options) as Promise<T[]>;
    return this.model.insertMany(data) as Promise<T[]>;
  };

  public async findOneAndUpdate<T>(
    selectQuery: Partial<T>,
    updates: Partial<any>
  ): Promise<T> {
    return this.model.findOneAndUpdate(selectQuery as FilterQuery<T>, updates, {
      new: true,
    }) as Promise<T>;
  }

  public find = async (
    filter: Partial<T>,
    fields?: string,
    populate?: any
  ): Promise<Array<T>> => {
    return this.model
      .find(filter as FilterQuery<T>)
      .select(fields ?? "")
      .populate(populate ?? "");
  };
  public async update(id: any, data: Partial<T>): Promise<T> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec() as Promise<T>;
  }

  async delete(id: object): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async filter(
    query: any,
    fields?: string,
    populate?: any,
    aggregate?: any,
    pageSize?: number,
    page?: number,
    sort?: any
  ): Promise<T[]> {    
    if (!aggregate) {
      let queryObj = this.model.find(query);
      if (sort) queryObj.sort(sort);
      if (fields) queryObj.select(fields);
      if (page && pageSize)
        queryObj.skip((page - 1) * pageSize).limit(pageSize);
      if (populate) queryObj.populate(populate);
      return await queryObj.exec();
    }
    return await this.model.aggregate(aggregate).exec();
  }

  public async count(query: Object): Promise<number> {
    return await this.model.countDocuments(query);
  }

  public bulkWrite(data: any[]): Promise<any> {
    return this.model.bulkWrite(data);
  }

  public bulkDelete(data: any[]): Promise<any> {
    return this.model.deleteMany(data);
  }

  public async updateMany<T>(
    selectQuery: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<number> {
    return this.model.updateMany(selectQuery, update as any) as any;
  }
}
