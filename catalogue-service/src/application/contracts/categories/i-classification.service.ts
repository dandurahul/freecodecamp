import { ClassificationModel } from "../../../domain/models/catagories/classification.model";
import { ClassificationFilterModel } from "../../../domain/models/catagories/filter/classification-filter.model";

export interface IClassificationService {
  createClassification(
    classification: ClassificationModel
  ): Promise<ClassificationModel>;

  getClassificationById(_id: string): Promise<ClassificationModel>;
  getAllClassifications(filterType: string): Promise<ClassificationModel[]>;
  updateClassification(
    id: string,
    classification: ClassificationModel,
    extendedCatalogFlag: boolean
  ): Promise<ClassificationModel>;
  deleteClassification(id: string): Promise<void>;
  updateManyClassifications(
    updateQuery: object,
    updateData: ClassificationModel
  ): Promise<void>;
  filterClassification(
    filterCriteria: ClassificationFilterModel,
    filterType: string,
    pageSize?: number,
    page?: number
  ): Promise<ClassificationModel[]>;
  createClassifications(
    classificationModels: ClassificationModel[]
  ): Promise<ClassificationModel[]>;
  updateClassifications(
    classificationModels: ClassificationModel[]
  ): Promise<ClassificationModel[]>;
  findOrCreateClassification(
    classification: ClassificationModel,
    extendedCatalogFlag: boolean
  ): Promise<any>;
}
