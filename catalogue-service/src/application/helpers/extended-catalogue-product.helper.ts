import { ContainerTypes } from "../../api/bindings/container-types";
import { inject, injectable } from "inversify";
import { FilterConstants } from "../constants/filter.constants";
import { IExtendedGlobalCatalogRepository } from "../../infrastructure/repositories/contracts/catalogues/i-extended-global-catalog.repository";
import { ISubCategoryRepository } from "../../infrastructure/repositories/contracts/catagories/i-sub-category.repository";
import { IClassificationRepository } from "../../infrastructure/repositories/contracts/catagories/i-classification.repository";
import { IGlobalCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { extractObjectIds } from "../utils/filter-functions";
import { ExtendedGlobalCatalogue } from "../../domain/models/catalogues/extended-global-catalog-product.model";
import { buildExtendedGlobalCatalogue } from "../builders/categorization.builder";
import { IExtendedGlobalCatalogService } from "../contracts/catalogues/i-extended-global-catalog.service";
import { IExtendedCatalogueHelperService } from "../contracts/helper/i-extended-catalogue-product.helper.service";

@injectable()
class ExtendedCatalogueHelperService
  implements IExtendedCatalogueHelperService
{
  @inject(ContainerTypes.SubCategoryRepository)
  private subCategoryRepository!: ISubCategoryRepository;
  @inject(ContainerTypes.ClassificationRepository)
  private classificationRepository!: IClassificationRepository;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.ExtendedGlobalCatalogRepository)
  private extendedGlobalCatalogRepository!: IExtendedGlobalCatalogRepository;
  @inject(ContainerTypes.ExtendedGlobalCatalogService)
  private extendedGlobalCatalogService!: IExtendedGlobalCatalogService;

  public async updateExtendedCatalogueProducts(
    subCategoryId: string,
    classificationId: string,
    type: string
  ) {
    let {
      secondaryIds,
      categoryId,
    }: { secondaryIds: string[]; categoryId: string | undefined } =
      await this.fetchSecondaryIds(type, subCategoryId, classificationId);
    const globalCatalogueProducts = await this.fetchGlobalCatalogueIds(
      type,
      subCategoryId,
      classificationId
    );

    await this.createorUpdateExtendedCatalogueProducts(
      secondaryIds,
      globalCatalogueProducts,
      categoryId,
      subCategoryId,
      classificationId,
      type
    );
    return { message: FilterConstants.EXTENDED_PRODUCTS_UPDATED_SUCESSFULLY };
  }

  private async createorUpdateExtendedCatalogueProducts(
    secondaryIds: string[],
    globalCatalogueProducts: any[],
    categoryId: string | undefined,
    subCategoryId: string,
    classificationId: string,
    type: string
  ) {
    if (secondaryIds?.length) {
      let extendedCatalogue: Partial<ExtendedGlobalCatalogue> = {
        globalCatalogueProducts,
        categoryId,
        subCategoryId,
        classificationId,
        secondaryIds,
        type,
      };
      let extendedCatalogProducts: any =
        buildExtendedGlobalCatalogue(extendedCatalogue);
      await this.extendedGlobalCatalogService.updateExtendedGlobalCatalogues(
        extendedCatalogProducts
      );
    } else {
      await this.extendedGlobalCatalogRepository.bulkDelete({
        globalCatalogue: {
          $in: extractObjectIds(globalCatalogueProducts, "_id"),
        },
      });
    }
  }

  private async fetchGlobalCatalogueIds(
    type: string,
    subCategoryId: string,
    classificationId: string
  ) {
    const globalCatalogueProducts =
      await this.globalCatalogueRepository.filterGlobalCatalogues({
        [type === FilterConstants.SUB_CATEGORY
          ? "subCategoryId"
          : "classificationId"]:
          type === FilterConstants.SUB_CATEGORY
            ? subCategoryId
            : classificationId,
      });
    const extractedData = globalCatalogueProducts.map(({ _id, productId }) => ({
      _id,
      productId,
    }));
    return extractedData;
  }

  private async fetchSecondaryIds(
    type: string,
    subCategoryId: string,
    classificationId: string
  ) {
    let secondaryIds: string[] = [];
    let categoryId: string | undefined;
    if (type === FilterConstants.SUB_CATEGORY) {
      const subCategory = await this.subCategoryRepository.getSubCategory({
        _id: subCategoryId,
      });
      categoryId = subCategory?.categoryId;
      secondaryIds = subCategory?.secondaryCategory || [];
    } else if (type === FilterConstants.CLASSIFICATION) {
      const classification =
        await this.classificationRepository.getClassification({
          _id: classificationId,
        });
      categoryId = classification?.categoryId;
      secondaryIds = classification?.secondarySubCategory || [];
    }
    return { secondaryIds, categoryId };
  }
}

export default ExtendedCatalogueHelperService;
