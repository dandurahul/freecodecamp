import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IClassificationService } from "../../contracts/categories/i-classification.service";
import { IClassificationRepository } from "../../../infrastructure/repositories/contracts/catagories/i-classification.repository";
import { ClassificationModel } from "../../../domain/models/catagories/classification.model";
import { IClassificationEntity } from "../../../infrastructure/repositories/entities/categories/classification.entity";
import { ErrorMessages } from "../../constants/error-messages";
import { IMediaTypeRepository } from "../../../infrastructure/repositories/contracts/i-media-type.repository";
import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { MediaTypeModel } from "../../../domain/models/media-type.model";
import { IMediaTypeEntity } from "../../../infrastructure/repositories/entities/imedia-type.entity";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { SeoModel } from "../../../domain/models/seo.model";
import { ClassificationFilterEntity } from "../../../infrastructure/repositories/entities/filter/classification-filter.entity";
import { TransformOptions } from "../../constants/transform-options";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { buildWithProducts } from "../../helpers/categorization.helper";
import { appError } from "../../../api/models/global-error-handler.model";
import { IExtendedCatalogueHelperService } from "../../contracts/helper/i-extended-catalogue-product.helper.service";
import { FilterConstants } from "../../constants/filter.constants";
import { ClassificationFilterModel } from "../../../domain/models/catagories/filter/classification-filter.model";

@injectable()
class ClassificationService implements IClassificationService {
  @inject(ContainerTypes.ClassificationRepository)
  private classificationRepository!: IClassificationRepository;
  @inject(ContainerTypes.MediaTypeRepository)
  private mediaTypeRepository!: IMediaTypeRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.ExtendedCatalogueHelperService)
  private extendedGlobalCatalogHelperService!: IExtendedCatalogueHelperService;

  async createClassification(
    classificationModel: ClassificationModel
  ): Promise<ClassificationModel> {
    let existingClassification =
      await this.classificationRepository.filterClassification({
        classificationName: classificationModel.classificationName,
      });
    if (existingClassification?.length)
      throw appError(ErrorMessages.DUPLICATE_CLASSIFICATION, 400);

    let classificationEntity = instanceToPlain(classificationModel, {
      enableCircularCheck: true,
    }) as IClassificationEntity;

    classificationEntity.seo = (
      await this.createOrUpdateSeo(classificationModel?.seo)
    )?._id;
    classificationEntity.webMedia = (
      await this.createOrUpdateMediaType(classificationModel?.webMedia)
    )?._id;
    classificationEntity.posMedia = (
      await this.createOrUpdateMediaType(classificationModel?.posMedia)
    )?._id;
    classificationEntity.mobileMedia = (
      await this.createOrUpdateMediaType(classificationModel?.mobileMedia)
    )?._id;

    return plainToInstance(
      ClassificationModel,
      await this.classificationRepository.createClassification(
        classificationEntity
      ),
      { enableCircularCheck: true }
    );
  }

  async getAllClassifications(filterType: string): Promise<any> {
    let classifications =
      await this.classificationRepository.filterClassification({}, filterType);

    let classificationsProducts =
      (await this.globalCatalogueRepository.getProductCountsByClassification(
        {}
      )) as any[];
    let classificationsResponse = plainToInstance(
      ClassificationModel,
      classifications,
      TransformOptions.tranformOptions
    );
    return buildWithProducts(
      classificationsProducts,
      classificationsResponse,
      "classificationId"
    );
  }

  //find by id
  async getClassificationById(_id: string): Promise<ClassificationModel> {
    let classification = this.classificationRepository.getClassification(
      {
        _id,
      },
      "webMedia mobileMedia posMedia seo"
    );
    return plainToInstance(
      ClassificationModel,
      classification,
      TransformOptions.tranformOptions
    ) as ClassificationModel;
  }

  async updateClassification(
    id: string,
    classificationModel: ClassificationModel,
    extendedCatalogFlag: boolean
  ): Promise<ClassificationModel> {
    let classificationEntity = instanceToPlain(
      classificationModel
    ) as IClassificationEntity;

    classificationEntity.seo = (
      await this.createOrUpdateSeo(classificationModel?.seo)
    )?._id;
    classificationEntity.webMedia = (
      await this.createOrUpdateMediaType(classificationModel?.webMedia)
    )?._id;
    classificationEntity.posMedia = (
      await this.createOrUpdateMediaType(classificationModel?.posMedia)
    )?._id;
    classificationEntity.mobileMedia = (
      await this.createOrUpdateMediaType(classificationModel?.mobileMedia)
    )?._id;

    let classificationResponse =
      this.classificationRepository.updateClassification(
        id,
        classificationEntity
      );
    this.updateDependencyCatalogueProducts(
      id,
      classificationEntity,
      extendedCatalogFlag
    ).catch();

    return plainToInstance(ClassificationModel, classificationResponse);
  }

  private async updateDependencyCatalogueProducts(
    id: string,
    classificationEntity: IClassificationEntity,
    extendedCatalogFlag: boolean
  ) {
    const existingSubCategory =
      await this.classificationRepository.getClassification({
        _id: id,
        deleteFlag: false,
        activeFlag: true,
      });

    const categoryId = classificationEntity?.categoryId;
    const existingCategoryId = existingSubCategory?.categoryId;
    const subCategoryId = classificationEntity?.subCategoryId;
    const existingSubCategoryId = existingSubCategory?.subCategoryId;

    if (
      (categoryId !== existingCategoryId ||
        subCategoryId !== existingSubCategoryId) &&
      id
    ) {
      await this.globalCatalogueRepository.updateBulkGlobalCatalogue(
        {
          classificationId: id,
          deleteFlag: false,
        },
        { category: categoryId, subCategory: subCategoryId }
      );
    }
    return extendedCatalogFlag
      ? await this.extendedGlobalCatalogHelperService
          .updateExtendedCatalogueProducts(
            "",
            id,
            FilterConstants.CLASSIFICATION
          )
          .catch()
      : () => {};
  }

  async deleteClassification(id: string): Promise<any> {
    await this.classificationRepository.deleteClassification(id);
    return {
      message: ErrorMessages.CLASSIFICATION_DELETED_SUCCESSFULLY,
    };
  }

  async updateManyClassifications(
    updateQuery: object,
    updateData: ClassificationModel
  ): Promise<void> {
    let classificationEntity = instanceToPlain(
      updateData
    ) as IClassificationEntity;
    return await this.classificationRepository.updateManyClassification(
      updateQuery,
      classificationEntity
    );
  }

  async filterClassification(
    filterCriteria: ClassificationFilterModel,
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<ClassificationModel[]> {
    let classifications = plainToInstance(
      ClassificationModel,
      await this.classificationRepository.filterClassification(
        filterCriteria,
        filterType,
        pageSize,
        page
      ),
      TransformOptions.tranformOptions
    ) as any;
    let classificationsProducts =
      (await this.globalCatalogueRepository.getProductCountsByClassification(
        filterCriteria
      )) as any[];
    return buildWithProducts(
      classificationsProducts,
      classifications,
      "classificationId"
    );
  }

  createClassifications(
    classifications: ClassificationModel[]
  ): Promise<ClassificationModel[]> {
    let classificationEntity = instanceToPlain(
      classifications
    ) as IClassificationEntity[];

    return plainToInstance(
      ClassificationModel,
      this.classificationRepository.createClassifications(classificationEntity)
    ) as any;
  }

  updateClassifications(
    classificationModels: ClassificationModel[]
  ): Promise<ClassificationModel[]> {
    let classificationEntity = instanceToPlain(
      classificationModels
    ) as IClassificationEntity[];

    return plainToInstance(
      ClassificationModel,
      this.classificationRepository.updateClassifications(classificationEntity)
    ) as any;
  }

  private async createOrUpdateSeo(
    seoModel: SeoModel | undefined
  ): Promise<ISeoEntity | undefined> {
    if (!seoModel) return;

    let seoEntity = instanceToPlain(seoModel, {
      enableCircularCheck: true,
    }) as ISeoEntity;

    if (seoEntity._id) {
      return this.seoRepository.updateSeo(seoEntity._id, seoEntity);
    }
    return await this.seoRepository.createSeo(seoEntity);
  }

  private async createOrUpdateMediaType(
    mediaTypeModel: MediaTypeModel | undefined
  ): Promise<IMediaTypeEntity | undefined> {
    if (!mediaTypeModel) return;

    let mediaTypeEntity = instanceToPlain(mediaTypeModel, {
      enableCircularCheck: true,
    }) as IMediaTypeEntity;
    if (mediaTypeEntity._id) {
      return this.mediaTypeRepository.updateMediaType(
        mediaTypeEntity._id,
        mediaTypeEntity
      );
    }
    return await this.mediaTypeRepository.createMediaType(mediaTypeEntity);
  }

  async findOrCreateClassification(
    classification: ClassificationModel,
    extendedCatalogFlag: boolean
  ) {
    let classificationEntity = instanceToPlain(
      classification
    ) as IClassificationEntity[];

    for (let classification of classificationEntity) {
      if (
        classification?.webMedia &&
        Object.keys(classification?.webMedia).length > 0
      ) {
        let web = await this.createOrUpdateMediaType(classification.webMedia);
        classification.webMedia = web?._id;
      } else delete classification.webMedia;

      if (
        classification?.mobileMedia &&
        Object.keys(classification?.mobileMedia).length > 0
      ) {
        let mobile = await this.createOrUpdateMediaType(
          classification.mobileMedia
        );
        classification.mobileMedia = mobile?._id;
      } else delete classification.mobileMedia;
    }
    let bulkOperationQuery = classificationEntity.map((item) => {
      return {
        updateOne: {
          filter: {
            classificationName: item.classificationName,
            businessUnitId: item.businessUnitId,
            deleteFlag: false,
          },
          update: {
            $setOnInsert: item,
          },
          upsert: true,
        },
      };
    });
    bulkOperationQuery?.length &&
      (await this.classificationRepository.updateClassifications(
        bulkOperationQuery
      ));
    let classifications =
      await this.classificationRepository.filterClassification({
        classificationNames: classificationEntity.map(
          (e) => e.classificationName
        ),
      });
    extendedCatalogFlag &&
      this.updateExtendedCatalogueProducts(classifications);
    return classifications;
  }

  private async updateExtendedCatalogueProducts(subCategories: any[]) {
    for (const iterator of subCategories) {
      await this.extendedGlobalCatalogHelperService
        .updateExtendedCatalogueProducts(
          "",
          iterator.id,
          FilterConstants.CLASSIFICATION
        )
        .catch();
    }
  }
}

export default ClassificationService;
