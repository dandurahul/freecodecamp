import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IClassificationEntity } from "../../entities/categories/classification.entity";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IClassificationRepository } from "../../contracts/catagories/i-classification.repository";
import {
  buildFilterObjectForClassification,
  getFilterForWebList,
} from "../../helpers/classification-filter.helper";
import FilterTypeEnum from "../../../enums/filter.enum";

@injectable()
class ClassificationRepository implements IClassificationRepository {
  @inject(ContainerTypes.ClassificationRepositoryBase)
  private repositoryBase!: IRepositoryBase<IClassificationEntity>;

  async createClassification(
    classification: IClassificationEntity
  ): Promise<IClassificationEntity> {
    return this.repositoryBase.create(classification);
  }
  async getClassification(
    filter: any,
    populate: string
  ): Promise<IClassificationEntity> {
    populate = populate
      ? populate
      : FilterTypeEnum.POPULATE_CLASSIFICATION_DATA;
    return this.repositoryBase.findOne(filter, populate);
  }
  async getAllClassifications(query: any): Promise<IClassificationEntity[]> {
    let filter = getFilterForWebList(query);
    return this.repositoryBase.find(filter?.filter, "", filter?.populate);
  }
  async updateClassification(
    id: string,
    classification: IClassificationEntity
  ): Promise<IClassificationEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      classification
    )) as IClassificationEntity;
  }
  async deleteClassification(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async updateManyClassification(
    updateQuery: object,
    updateData: IClassificationEntity
  ): Promise<void> {
    let filter = buildFilterObjectForClassification("", updateQuery);
    if (updateData?.deleteFlag) {
      return this.repositoryBase.bulkDelete(filter?.filter);
    } else {
      return this.repositoryBase.updateMany(filter?.filter, updateData);
    }
  }
  async filterClassification(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number
  ): Promise<IClassificationEntity[]> {
    let filter = buildFilterObjectForClassification(filterType, filterCriteria);

    return await this.repositoryBase.filter(
      filter?.filter ? filter.filter : {},
      filter?.fields,
      filter?.populate,
      filter?.aggregate,
      pageSize,
      page,
      filter?.sort
    );
  }

  createClassifications(
    classifications: IClassificationEntity[]
  ): Promise<IClassificationEntity[]> {
    return this.repositoryBase.bulkInsert(classifications);
  }

  updateClassifications(classifications: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(classifications);
  }
}
export default ClassificationRepository;
