import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ISubCategoryService } from "../../contracts/categories/i-sub-category.service";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ISubCategoryRepository } from "../../../infrastructure/repositories/contracts/catagories/i-sub-category.repository";
import { SubCategoryModel } from "../../../domain/models/catagories/sub-category.model";
import { ISubCategoryEntity } from "../../../infrastructure/repositories/entities/categories/sub-category.entity";
import { ErrorMessages } from "../../constants/error-messages";
import { IMediaTypeRepository } from "../../../infrastructure/repositories/contracts/i-media-type.repository";
import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { MediaTypeModel } from "../../../domain/models/media-type.model";
import { IMediaTypeEntity } from "../../../infrastructure/repositories/entities/imedia-type.entity";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { SeoModel } from "../../../domain/models/seo.model";
import { TransformOptions } from "../../constants/transform-options";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { buildWithProducts } from "../../helpers/categorization.helper";
import { FilterConstants } from "../../constants/filter.constants";
import FilterTypeEnum from "../../../infrastructure/enums/filter.enum";
import { SubCategoryFilterModel } from "../../../domain/models/catagories/filter/sub-category-filter.model";
import { appError } from "../../../api/models/global-error-handler.model";
import { IExtendedCatalogueHelperService } from "../../contracts/helper/i-extended-catalogue-product.helper.service";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { buildPaginationObject } from "../../builders/pagination.builder";
import mongoose from "mongoose";

@injectable()
class SubCategoryService implements ISubCategoryService {
  @inject(ContainerTypes.SubCategoryRepository)
  private subCategoryRepository!: ISubCategoryRepository;
  @inject(ContainerTypes.MediaTypeRepository)
  private mediaTypeRepository!: IMediaTypeRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.ExtendedCatalogueHelperService)
  private extendedGlobalCatalogHelperService!: IExtendedCatalogueHelperService;

  async createSubCategory(
    subCategory: SubCategoryModel
  ): Promise<SubCategoryModel> {
    let subCategoryEntity = instanceToPlain(subCategory, {
      enableCircularCheck: true,
    }) as ISubCategoryEntity;

    subCategoryEntity.seo = (
      await this.createOrUpdateSeo(subCategory?.seo)
    )?._id;
    subCategoryEntity.webMedia = (
      await this.createOrUpdateMediaType(subCategory?.webMedia)
    )?._id;
    subCategoryEntity.posMedia = (
      await this.createOrUpdateMediaType(subCategory?.posMedia)
    )?._id;
    subCategoryEntity.mobileMedia = (
      await this.createOrUpdateMediaType(subCategory?.mobileMedia)
    )?._id;

    return plainToInstance(
      SubCategoryModel,
      await this.subCategoryRepository.createSubCategory(subCategoryEntity),
      TransformOptions.tranformOptions
    );
  }

  async getAllSubCategories(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<SubCategoryModel[]> {
    let subCategoryProducts =
      (await this.globalCatalogueRepository.getProductCountsBySubCategory(
        {}
      )) as any[];

    let subCategories = plainToInstance(
      SubCategoryModel,
      await this.subCategoryRepository.filterSubCategory(
        {},
        filterType,
        pageSize,
        page
      ),
      TransformOptions.tranformOptions
    ) as any;
    return buildWithProducts(
      subCategoryProducts,
      subCategories,
      "subCategoryId"
    );
  }

  async getSubCategoryById(
    id: string,
    filterType: string | undefined
  ): Promise<SubCategoryModel> {
    let subCategory = await this.subCategoryRepository.getSubCategory(
      { _id: id },
      filterType === FilterConstants.METADATA
        ? ""
        : FilterTypeEnum.POPULATE_SUB_CATEGORY_DATA
    );
    return plainToInstance(
      SubCategoryModel,
      subCategory,
      TransformOptions.tranformOptions
    );
  }

  async updateSubCategory(
    id: string,
    subCategoryModel: SubCategoryModel,
    extendedCatalogFlag: boolean
  ): Promise<SubCategoryModel> {
    let subCategoryEntity = instanceToPlain(
      subCategoryModel
    ) as ISubCategoryEntity;
    subCategoryEntity.seo = (
      await this.createOrUpdateSeo(subCategoryModel?.seo)
    )?._id;
    subCategoryEntity.webMedia = (
      await this.createOrUpdateMediaType(subCategoryModel?.webMedia)
    )?._id;
    subCategoryEntity.posMedia = (
      await this.createOrUpdateMediaType(subCategoryModel?.posMedia)
    )?._id;
    subCategoryEntity.mobileMedia = (
      await this.createOrUpdateMediaType(subCategoryModel?.mobileMedia)
    )?._id;

    let subCategoryResponse =
      await this.subCategoryRepository.updateSubCategory(id, subCategoryEntity);
    this.updateDependencyCatalogueProducts(
      id,
      subCategoryEntity,
      extendedCatalogFlag
    ).catch();

    return plainToInstance(
      SubCategoryModel,
      subCategoryResponse,
      TransformOptions.tranformOptions
    );
  }

  private async updateDependencyCatalogueProducts(
    id: string,
    subCategoryEntity: ISubCategoryEntity,
    extendedCatalogFlag: boolean
  ) {
    const existingSubCategory = await this.subCategoryRepository.getSubCategory(
      {
        _id: id,
        deleteFlag: false,
        activeFlag: true,
      }
    );

    const categoryId = subCategoryEntity?.categoryId;
    const existingCategoryId = existingSubCategory?.categoryId;

    if (categoryId !== existingCategoryId && id) {
      await this.globalCatalogueRepository.updateBulkGlobalCatalogue(
        {
          subCategoryId: id,
          deleteFlag: false,
        },
        { category: categoryId }
      );
    }
    return extendedCatalogFlag
      ? await this.extendedGlobalCatalogHelperService
          .updateExtendedCatalogueProducts(id, "", FilterConstants.SUB_CATEGORY)
          .catch()
      : () => {};
  }

  async filterSubCategory(
    filterCriteria: SubCategoryModel,
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<SubCategoryModel[]> {
    let subCategories = plainToInstance(
      SubCategoryModel,
      await this.subCategoryRepository.filterSubCategory(
        filterCriteria,
        filterType,
        pageSize,
        page
      ),
      TransformOptions.tranformOptions
    ) as any;
    let subCategoryProducts =
      (await this.globalCatalogueRepository.getProductCountsBySubCategory(
        filterCriteria
      )) as any[];
    return buildWithProducts(
      subCategoryProducts,
      subCategories,
      "subCategoryId"
    );
  }

  createSubCategories(
    categoryModels: SubCategoryModel[]
  ): Promise<SubCategoryModel[]> {
    let categoryEntity = instanceToPlain(
      categoryModels
    ) as ISubCategoryEntity[];

    return plainToInstance(
      SubCategoryModel,
      this.subCategoryRepository.createSubCategories(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateSubCategories(
    subCategoryModels: SubCategoryModel[]
  ): Promise<SubCategoryModel[]> {
    let subCategoryEntity = instanceToPlain(
      subCategoryModels
    ) as ISubCategoryEntity[];

    return plainToInstance(
      SubCategoryModel,
      this.subCategoryRepository.updateSubCategories(subCategoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async deleteSubCategory(id: string): Promise<any> {
    await this.subCategoryRepository.deleteSubCategory(id);
    return {
      message: ErrorMessages.SUB_CATEGORY_DELETED_SUCCESSFULLY,
    };
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

  async updateManySubCategories(
    updateQuery: object,
    updateData: SubCategoryModel
  ): Promise<void> {
    let subCategorytEntity = instanceToPlain(updateData) as ISubCategoryEntity;
    let result = await this.subCategoryRepository.updateManySubCategory(
      updateQuery,
      subCategorytEntity
    );
    return result;
  }

  async findOrCreateSubCategorys(
    subCatagory: SubCategoryModel,
    extendedCatalogFlag: boolean,
    filterType: string
  ) {
    let subCategoryEntity = instanceToPlain(
      subCatagory
    ) as ISubCategoryEntity[];

    for (let subCategory of subCategoryEntity) {
      subCategory.webMedia = subCategory?.webMedia
        ? (await this.createOrUpdateMediaType(subCategory.webMedia))?.["_id"]
        : undefined;

      subCategory.mobileMedia = subCategory?.mobileMedia
        ? (await this.createOrUpdateMediaType(subCategory.mobileMedia))?.["_id"]
        : undefined;

      subCategoryEntity = Array.from(
        new Set(subCategoryEntity.map((obj) => JSON.stringify(obj)))
      ).map((str) => JSON.parse(str));

      let bulkOperationQuery = subCategoryEntity?.map((item) => {
        const { id, _id, ...updateData } = item;
        let subcategoryId = id || _id;
        if (subcategoryId || filterType) {
          return {
            updateOne: {
              filter: {
                _id: new mongoose.Types.ObjectId(subcategoryId),
                businessUnitId: item.businessUnitId,
                categoryId: item.categoryId,
              },
              update: { $set: updateData },
            },
          };
        } else {
          return {
            insertOne: {
              document: item,
            },
          };
        }
      });

      await this.subCategoryRepository.updateSubCategories(bulkOperationQuery);
      let subCategories = await this.subCategoryRepository.filterSubCategory({
        subCategoryNames: subCategoryEntity.map((e) => e.subCategoryName),
      });
      extendedCatalogFlag &&
        this.updateExtendedCatalogueProducts(subCategories);
      return subCategories;
    }
  }

  private async updateExtendedCatalogueProducts(subCategories: any[]) {
    for (const iterator of subCategories) {
      await this.extendedGlobalCatalogHelperService
        .updateExtendedCatalogueProducts(
          iterator.id,
          "",
          FilterConstants.SUB_CATEGORY
        )
        .catch();
    }
  }

  async filterSubCatagoryByPagination(
    filterCriteria: any,
    filterType: string,
    page: number,
    pageSize: number
  ): Promise<PaginationModel> {
    let count = await this.subCategoryRepository.filterSubCatagoryByPagination(
      filterCriteria,
      filterType,
      pageSize,
      page
    );
    return buildPaginationObject(count, pageSize);
  }
}

export default SubCategoryService;
