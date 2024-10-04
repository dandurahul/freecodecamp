import { ContainerTypes } from "../../api/bindings/container-types";
import { inject, injectable } from "inversify";
import { FilterConstants } from "../constants/filter.constants";
import { IGlobalCatalogueHelperService } from "../contracts/helper/i-global-catalogue.helper.service";
import { ICategoryRepository } from "../../infrastructure/repositories/contracts/catagories/i-category.repository";
import { IGlobalCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { isValidArray } from "../utils/filter-functions";
import { StoreCatalogueFilterModel } from "../../api/models/store-catalogue-product-filter.model";
import { ISubCategoryRepository } from "../../infrastructure/repositories/contracts/catagories/i-sub-category.repository";
import { IClassificationRepository } from "../../infrastructure/repositories/contracts/catagories/i-classification.repository";
import { IExtendedGlobalCatalogRepository } from "../../infrastructure/repositories/contracts/catalogues/i-extended-global-catalog.repository";
import { fetchValuesFromRequest } from "../../infrastructure/repositories/helpers/extended-global-catalog-filter.helper";

@injectable()
class GlobalCatalogueHelperService implements IGlobalCatalogueHelperService {
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.CategoryRepository)
  private categoryRepository!: ICategoryRepository;
  @inject(ContainerTypes.SubCategoryRepository)
  private subCategoryRepository!: ISubCategoryRepository;
  @inject(ContainerTypes.ClassificationRepository)
  private classificationRepository!: IClassificationRepository;
  @inject(ContainerTypes.ExtendedGlobalCatalogRepository)
  private extendedGlobalCatalogRepository!: IExtendedGlobalCatalogRepository;

  async getGlobalCatalogueDetails(
    storeCatalogue: StoreCatalogueFilterModel,
    extendedCatalogFlag: boolean,
    filterType: string
  ): Promise<any> {
    const {
      classificationIds,
      subCategoryIds,
      categoryIds,
      subCategoryId,
      classificationId,
      productIds,
      categoryId,
    } = fetchValuesFromRequest(storeCatalogue);
    let { breadCrumb, storeCatalogueFilter, isPrimary } =
      await this.getBreadCrumbDetails({
        categoryId,
        subCategoryId,
        classificationId,
        classificationIds,
        subCategoryIds,
        categoryIds,
        productIds,
        filterType,
      });

    let globalCatalogueProducts: any[] = [];
    if (isPrimary === false) {
      globalCatalogueProducts = extendedCatalogFlag
        ? await this.extendedGlobalCatalogRepository.filterExtendedGlobalCatalog(
            storeCatalogue,
            FilterConstants.FOR_EXTENDED_CATALOGUE
          )
        : [];
    } else {
      globalCatalogueProducts =
        await this.globalCatalogueRepository.filterGlobalCatalogues(
          storeCatalogueFilter,
          FilterConstants.META_DATE
        );
    }
    return { globalCatalogueProducts, breadCrumb };
  }

  async getBreadCrumbDetails({
    categoryId,
    subCategoryId,
    classificationId,
    classificationIds,
    subCategoryIds,
    categoryIds,
    productIds,
    filterType,
  }: any) {
    const storeCatalogueFilter: StoreCatalogueFilterModel = {
      activeFlag: true,
      deleteFlag: false,
    };

    let breadCrumb: any = [];
    if (classificationIds?.length > 0) {
      breadCrumb = await this.getBreadCrumbData(
        classificationIds,
        FilterConstants.CLASSIFICATION
      );
      storeCatalogueFilter.classificationIds = classificationIds;
    } else if (subCategoryIds?.length > 0) {
      breadCrumb = await this.getBreadCrumbData(
        subCategoryIds,
        FilterConstants.SUB_CATEGORY
      );
      storeCatalogueFilter.subCategoryIds = subCategoryIds;
    } else if (categoryIds?.length > 0) {
      breadCrumb = await this.getBreadCrumbData(
        categoryIds,
        FilterConstants.CATEGORY
      );
      storeCatalogueFilter.categoryIds = categoryIds;
    }
    const isPrimary = await this.isPrimary(
      categoryId,
      subCategoryId,
      classificationId
    );
    let extendedCatalogueProductIds: any = [];
    if (filterType === FilterConstants.FOR_SECTIONS) {
      let extendedCatalogue =
        await this.extendedGlobalCatalogRepository.filterExtendedGlobalCatalog({
          secondaryCategory: categoryIds,
        });
      extendedCatalogueProductIds =
        extendedCatalogue?.map((item) => item?.productId) || [];
    }
    storeCatalogueFilter.productIds = productIds
      .map((item: string) => String(item))
      .concat(extendedCatalogueProductIds);
    return {
      breadCrumb,
      storeCatalogueFilter,
      isPrimary,
    };
  }

  async getBreadCrumbData(idArray: any, type: string | undefined) {
    let breadCrumb: any = [];
    for (const id of idArray) {
      if (type === FilterConstants.CLASSIFICATION) {
        const classification: any =
          await this.classificationRepository.getClassification(
            id,
            `${FilterConstants.subCategoryId} + ${FilterConstants.categoryId}`
          );
        breadCrumb = this.getClassificationBreadCrumb(classification);
      } else if (type === FilterConstants.SUB_CATEGORY) {
        let subCategory: any = await this.subCategoryRepository.getSubCategory(
          { _id: id },
          FilterConstants.categoryId
        );
        breadCrumb = this.getSubCategoryBreadCrumb(subCategory);
      } else if (type === FilterConstants.CATEGORY) {
        let category: any = await this.categoryRepository.getCategory(id);
        breadCrumb = this.getCategoryBreadCrumb(category);
      }
    }
    return breadCrumb;
  }

  private getCategoryBreadCrumb(category: any) {
    let breadCrumb = [];
    breadCrumb.push(
      this.buildBreadCrumb(
        category,
        FilterConstants.CATEGORY,
        FilterConstants.CATEGORY_NAME
      )
    );
    return breadCrumb;
  }

  private getSubCategoryBreadCrumb(subCategory: any) {
    let breadCrumb = [];
    breadCrumb.push(
      this.buildBreadCrumb(
        subCategory,
        FilterConstants.SUB_CATEGORY,
        FilterConstants.SUB_CATEGORY_NAME
      )
    );

    breadCrumb.push(
      this.buildBreadCrumb(
        subCategory?.categoryId,
        FilterConstants.CATEGORY,
        FilterConstants.CATEGORY_NAME
      )
    );
    return breadCrumb;
  }

  private getClassificationBreadCrumb(classification: any) {
    let breadCrumb = [];
    breadCrumb.push(
      this.buildBreadCrumb(
        classification,
        FilterConstants.CLASSIFICATION,
        FilterConstants.CLASSIFICATION_NAME
      )
    );
    breadCrumb.push(
      this.buildBreadCrumb(
        classification.subCategoryId,
        FilterConstants.SUB_CATEGORY,
        FilterConstants.SUB_CATEGORY_NAME
      )
    );
    breadCrumb.push(
      this.buildBreadCrumb(
        classification.categoryId,
        FilterConstants.CATEGORY,
        FilterConstants.CATEGORY_NAME
      )
    );
    return breadCrumb;
  }

  private buildBreadCrumb(list: any, key: string | undefined, keyName: any) {
    if (list && list.id) {
      return {
        dataValue: list.id,
        dataFrom: key,
        value: list[keyName],
      };
    }
    return null;
  }

  private async isPrimary(
    categoryId: string,
    subCategoryId: string,
    classificationId: string
  ) {
    try {
      if (categoryId?.length > 0 && subCategoryId?.length > 0) {
        const query: any = {
          category: categoryId,
          subCategory: subCategoryId,
          deleteFlag: false,
        };
        if (classificationId?.length > 0) {
          query.classification = classificationId;
        }
        const globalCatalog =
          await this.globalCatalogueRepository.getGlobalCatalogue(query);
        return globalCatalog?._id ? true : false;
      }
      return true;
    } catch (error) {
      return error;
    }
  }
}

export default GlobalCatalogueHelperService;
