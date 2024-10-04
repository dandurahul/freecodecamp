import { IClassificationEntity } from "../../entities/categories/classification.entity";
import { ClassificationFilterEntity } from "../../entities/filter/classification-filter.entity";

export interface IClassificationRepository {
  createClassification(
    classification: IClassificationEntity
  ): Promise<IClassificationEntity>;

  getClassification(
    filter?: any,
    populate?: string
  ): Promise<IClassificationEntity>;
  getAllClassifications(query: any): Promise<IClassificationEntity[]>;
  updateClassification(
    id: string,
    classification: IClassificationEntity
  ): Promise<IClassificationEntity>;
  deleteClassification(id: string): Promise<void>;
  filterClassification(
    filterCriteria: object,
    filterType?: string,
    pageSize?: number,
    page?: number
  ): Promise<IClassificationEntity[]>;
  createClassifications(
    classification: IClassificationEntity[]
  ): Promise<IClassificationEntity[]>;
  updateClassifications(classification: any[]): Promise<any>;
  updateManyClassification(
    updateQuery: object,
    updateData: IClassificationEntity
  ): Promise<void>;
}
