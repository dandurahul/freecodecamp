import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ICategoryRepository } from "../../../infrastructure/repositories/contracts/catagories/i-category.repository";
import { ICategoryService } from "../../contracts/categories/i-category.service";
import { CategoryModel } from "../../../domain/models/catagories/category.model";
import { ICategoryEntity } from "../../../infrastructure/repositories/entities/categories/category.entity";
import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { IMediaTypeEntity } from "../../../infrastructure/repositories/entities/imedia-type.entity";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { IMediaTypeRepository } from "../../../infrastructure/repositories/contracts/i-media-type.repository";
import { SeoModel } from "../../../domain/models/seo.model";
import { MediaTypeModel } from "../../../domain/models/media-type.model";
import { TransformOptions } from "../../constants/transform-options";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { buildWithProducts } from "../../helpers/categorization.helper";
import { ISubCategoryRepository } from "../../../infrastructure/repositories/contracts/catagories/i-sub-category.repository";
import { IClassificationRepository } from "../../../infrastructure/repositories/contracts/catagories/i-classification.repository";
import FilterTypeEnum from "../../../infrastructure/enums/filter.enum";
import { buildCategoriesForSearch } from "../../helpers/category.helper";
import { FilterConstants } from "../../constants/filter.constants";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { SubCategoryModel } from "../../../domain/models/catagories/sub-category.model";
import { ClassificationModel } from "../../../domain/models/catagories/classification.model";
import mongoose from "mongoose";
import {
  customUrlTransformation,
  getMatchingIds,
  getSeoUrl,
} from "../../utils/filter-functions";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { buildPaginationObject } from "../../builders/pagination.builder";

@injectable()
class CategoryService implements ICategoryService {
  @inject(ContainerTypes.CategoryRepository)
  private categoryRepository!: ICategoryRepository;
  @inject(ContainerTypes.SubCategoryRepository)
  private subCategoryRepository!: ISubCategoryRepository;
  @inject(ContainerTypes.ClassificationRepository)
  private classificationRepository!: IClassificationRepository;
  @inject(ContainerTypes.MediaTypeRepository)
  private mediaTypeRepository!: IMediaTypeRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;
  private _categoryEntity!: ICategoryEntity;

  async createCategory(category: CategoryModel): Promise<CategoryModel> {
    let seoEntity = await this.createOrUpdateSeo(category?.seo);
    let webMedia = await this.createOrUpdateMediaType(category?.webMedia);
    let posMedia = await this.createOrUpdateMediaType(category?.posMedia);
    let mobileMedia = await this.createOrUpdateMediaType(category?.mobileMedia);

    this._categoryEntity = instanceToPlain(category) as ICategoryEntity;

    this.assignDepdentEntities(seoEntity, webMedia, posMedia, mobileMedia);

    let categoryResponse = await this.categoryRepository.createCategory(
      this._categoryEntity
    );
    return plainToInstance(
      CategoryModel,
      categoryResponse,
      TransformOptions.tranformOptions
    );
  }

  async getCategories(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<CategoryModel[]> {
    try {
      let categories = await this.categoryRepository.filterCategory(
        {},
        filterType,
        page,
        pageSize
      );
      let categoryProducts =
        (await this.globalCatalogueRepository.getProductCountsByCategory(
          {}
        )) as any[];
      let categoriesResponse = plainToInstance(
        CategoryModel,
        categories,
        TransformOptions.tranformOptions
      ) as any;
      return buildWithProducts(
        categoryProducts,
        categoriesResponse,
        "categoryId"
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //find by id
  async getCategoryById(
    _id: string,
    filterType: string | undefined
  ): Promise<CategoryModel> {
    try {
      let category = await this.categoryRepository.getCategory(_id, filterType);
      return plainToInstance(
        CategoryModel,
        category,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateCategory(
    id: string,
    category: CategoryModel
  ): Promise<CategoryModel> {
    let seoEntity = await this.createOrUpdateSeo(category?.seo);
    let webMedia = await this.createOrUpdateMediaType(category?.webMedia);
    let posMedia = await this.createOrUpdateMediaType(category?.posMedia);
    let mobileMedia = await this.createOrUpdateMediaType(category?.mobileMedia);

    this._categoryEntity = instanceToPlain(category) as ICategoryEntity;

    this.assignDepdentEntities(seoEntity, webMedia, posMedia, mobileMedia);

    try {
      let categoryResponse = this.categoryRepository.updateCategory(
        id,
        this._categoryEntity
      );
      return plainToInstance(CategoryModel, categoryResponse);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private assignDepdentEntities(
    seoEntity: ISeoEntity | undefined,
    webMedia: IMediaTypeEntity | undefined,
    posMedia: IMediaTypeEntity | undefined,
    mobileMedia: IMediaTypeEntity | undefined
  ) {
    this._categoryEntity.seo = seoEntity?._id;
    this._categoryEntity.webMedia = webMedia?._id;
    this._categoryEntity.posMedia = posMedia?._id;
    this._categoryEntity.mobileMedia = mobileMedia?._id;
  }

  async deleteCategory(id: string): Promise<void> {
    let result: any;
    try {
      await this.categoryRepository.deleteCategory(id);
      result = {
        message: ErrorMessages.CATEGORY_DELETED_SUCCESSFULLY,
      };
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async filterCatagory(
    query: any,
    filterType: string | undefined,
    page: number,
    pageSize: number,
    fetchType: string | undefined
  ): Promise<CategoryModel[]> {
    let categories = plainToInstance(
      CategoryModel,
      await this.categoryRepository.filterCategory(
        query,
        filterType,
        pageSize,
        page,
        fetchType
      ),
      TransformOptions.tranformOptions
    ) as any;

    let categoryProducts =
      (await this.globalCatalogueRepository.getProductCountsByCategory(
        query
      )) as any[];
    return buildWithProducts(categoryProducts, categories, "categoryId");
  }

  async filterCatagoryByPagination(
    filterCriteria: any,
    fetchType: string | undefined,
    page: number,
    pageSize: number
  ): Promise<PaginationModel> {
    let count = await this.categoryRepository.filterCatagoryByPagination(
      filterCriteria,
      fetchType,
      pageSize,
      page
    );
    return buildPaginationObject(count, pageSize);
  }

  createCategories(categoryModels: CategoryModel[]): Promise<CategoryModel[]> {
    let categoryEntity = instanceToPlain(categoryModels) as ICategoryEntity[];

    return plainToInstance(
      CategoryModel,
      this.categoryRepository.createCategories(categoryEntity)
    ) as any;
  }

  updateCategories(categoryModels: CategoryModel[]): Promise<CategoryModel[]> {
    let categoryEntity = instanceToPlain(categoryModels) as ICategoryEntity[];

    return plainToInstance(
      CategoryModel,
      this.categoryRepository.updateCategories(categoryEntity)
    ) as any;
  }

  async getCategoriesBySearchText(
    searchKey: string,
    businessUnitId: string | undefined
  ): Promise<any> {
    try {
      let catagories = await this.categoryRepository.filterCategory(
        { searchKey: searchKey, businessUnitId: businessUnitId },
        FilterTypeEnum.SEARCH_BY_KEY
      );
      let fullCatagoryList = await this.categoryRepository.filterCategory(
        { businessUnitId: businessUnitId },
        FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED
      );
      9;
      let subCategories = await this.subCategoryRepository.filterSubCategory(
        { searchKey: searchKey, businessUnitId: businessUnitId },
        FilterTypeEnum.SEARCH_BY_KEY
      );
      let fullSubCategoryList =
        await this.subCategoryRepository.filterSubCategory(
          { businessUnitId: businessUnitId },
          FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED
        );
      let classifications =
        await this.classificationRepository.filterClassification(
          {
            searchKey: searchKey,
            businessUnitId: businessUnitId,
          },
          FilterTypeEnum.SEARCH_BY_KEY
        );

      let fullClassificationList =
        await this.classificationRepository.filterClassification(
          { businessUnitId: businessUnitId },
          FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED
        );
      return buildCategoriesForSearch(
        catagories,
        subCategories,
        classifications,
        fullCatagoryList,
        fullSubCategoryList,
        fullClassificationList
      );
    } catch (e) {}
  }

  async getTreeForAllCategories(filterCriteria: any): Promise<any> {
    let categoryListArray: any = [];
    let resultList: any = [];
    //TODO remove list
    //Can be use mongo query
    let categoryList = await this.categoryRepository.filterCategory(
      filterCriteria,
      FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED
    );
    let fullSubCategoryList =
      await this.subCategoryRepository.filterSubCategory(
        filterCriteria,
        FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED
      );
    let fullClassificationList =
      await this.classificationRepository.filterClassification(
        filterCriteria,
        FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED
      );

    let globalCatalogueList =
      await this.globalCatalogueRepository.filterGlobalCatalogues(
        filterCriteria,
        FilterTypeEnum.CATALOGUE_DETAILS_WITH_CATEGORY_IDS,
        0,
        0
      );
    try {
      categoryList?.map((category) => {
        let filteredGlobalCataloguesByCategory = globalCatalogueList?.filter(
          (catalogue: any) => catalogue.category?._id == category.id
        );
        let filteredSubCategoryByCategory = fullSubCategoryList?.filter(
          (subCategory: any) => subCategory?.categoryId == category?.id
        );

        let filteredSubCategories;
        if (filteredGlobalCataloguesByCategory?.length > 0) {
          if (
            filteredSubCategoryByCategory?.length > 0 &&
            category &&
            !category.productAllowed
          ) {
            filteredSubCategories = this.constructSubCategoryTree(
              filteredSubCategoryByCategory,
              category,
              globalCatalogueList,
              fullClassificationList
            );

            filteredSubCategories = filteredSubCategories?.filter(function (
              subCategory: any
            ) {
              return subCategory !== null && subCategory !== undefined;
            });
            // filteredSubcategory = sortArrayByString(
            //   filteredSubcategory,
            //   FilterConstants.SUB_CATEGORY_NAME
            // );
          }
          let response = {
            categoryId: category.id,
            orderValue: category.orderValue,
            categoryName: category.categoryName,
            productAllowed: category.productAllowed,
            subCategory:
              filteredSubCategories?.length > 0
                ? filteredSubCategories
                : undefined,
          };
          categoryListArray.push(response);
        }
      });

      resultList = categoryListArray?.filter(function (el: null) {
        return el != null;
      });
      //resultList = sortArrayByString(resultList, FilterConstants.CATEGORY_NAME);
    } catch (err: any) {
      throw err;
    }
    return resultList;
  }

  private constructSubCategoryTree(
    subCategoryList: any,
    category: any,
    globalCatalogueList: any,
    fullClassificationList: any
  ): any {
    return subCategoryList?.map((subCategory: any) => {
      let filteredGlobalCataloguesBySubCategory = globalCatalogueList?.filter(
        (catalogue: any) => catalogue.subCategory?._id == subCategory.id
      );

      let filteredClassificationBasedOnCatSubCat =
        fullClassificationList?.filter(
          (classification: any) =>
            classification.categoryId == category.id &&
            classification.subCategoryId == subCategory.id
        );
      if (
        filteredGlobalCataloguesBySubCategory &&
        filteredGlobalCataloguesBySubCategory.length > 0
      ) {
        if (
          filteredClassificationBasedOnCatSubCat?.length > 0 &&
          subCategory &&
          !subCategory.productAllowed
        ) {
          let filteredClassifications: any = [];
          for (const classification of filteredClassificationBasedOnCatSubCat) {
            let filteredGlobalCataloguesByClassification =
              globalCatalogueList.filter(
                (catalogue: any) =>
                  catalogue.classification?._id == classification.id
              );

            if (
              filteredGlobalCataloguesByClassification &&
              filteredGlobalCataloguesByClassification.length > 0
            ) {
              let data = {
                classificationId: classification.id,
                classificationName: classification.classificationName,
              };
              filteredClassifications.push(data);
            }
          }

          return {
            subCategoryId: subCategory.id,
            subCategoryName: subCategory.subCategoryName,
            productAllowed: subCategory.productAllowed,
            classification: filteredClassifications,
          };
        } else {
          return {
            subCategoryId: subCategory.id,
            subCategoryName: subCategory.subCategoryName,
          };
        }
      }
    });
  }

  private async createOrUpdateSeo(
    seoModel: SeoModel | undefined
  ): Promise<ISeoEntity | undefined> {
    if (!seoModel) return;

    let seoEntity = instanceToPlain(seoModel) as ISeoEntity;
    if (seoEntity?._id) {
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

    if (mediaTypeEntity?._id) {
      return this.mediaTypeRepository.updateMediaType(
        mediaTypeEntity._id,
        mediaTypeEntity
      );
    }
    return await this.mediaTypeRepository.createMediaType(mediaTypeEntity);
  }

  async getCategorizationBasedOnProductIds(
    requestBody: any,
    filterType: string,
    extendedCatalogFlag: boolean,
    allowedOutOfStock: boolean
  ) {
    try {
      let globalCatalogueFilter: any = {};
      let storeCatalogs;
      if (
        filterType != FilterConstants.GLOBAL &&
        requestBody?.entityInternalId &&
        filterType != FilterConstants.EXTERNAL_PIM
      ) {
        storeCatalogs =
          await this.storeCatalogueRepository.filterStoreCatalogues(
            {
              extendedCatalogFlag,
              outOfStockProductsAllowed: allowedOutOfStock,
              entityInternalId: requestBody.entityInternalId,
            },
            FilterConstants.CHECK_VARIANTS,
            0,
            0,
            FilterConstants.IGNORE_PRODUCTIDS
          );
        let productIds = storeCatalogs?.map((item: any) => item.productId);
        globalCatalogueFilter = {
          productIds,
        };
      }
      let globalCatalogueProducts: any =
        await this.globalCatalogueRepository.filterGlobalCatalogues({
          ...globalCatalogueFilter,
          businessUnitId: requestBody.businessUnitId,
        });
      let categoryIds: Set<string> = new Set();
      let subCategoryIds: Set<string> = new Set();
      let classificationIds: Set<string> = new Set();

      for (const item of globalCatalogueProducts) {
        if (item?.category?._id !== undefined) {
          categoryIds.add(item.category._id);
        }
        if (item?.subCategory?._id !== undefined) {
          subCategoryIds.add(item.subCategory._id);
        }
        if (item?.classification?._id !== undefined) {
          classificationIds.add(item.classification._id);
        }
      }
      let categoryFilteredIds: string[] = Array.from(categoryIds);
      let subCategoryFilteredIds: string[] = Array.from(subCategoryIds);
      let classificationFilteredIds: string[] = Array.from(classificationIds);
      let categoriesFilter: any = {
        categoryIds: categoryFilteredIds,
        businessUnitId: requestBody.businessUnitId,
      };
      if (filterType == FilterConstants.EXTERNAL_PIM) {
        categoriesFilter = {};
      }
      let [storeCategories, storeSubCategories, classications] =
        await Promise.all([
          this.categoryRepository.filterCategory(
            categoriesFilter,
            FilterTypeEnum.WEBLIST_WITH_COUNT
          ),
          this.subCategoryRepository.filterSubCategory(
            { activeFlag: true },
            FilterTypeEnum.WEBLIST_WITH_COUNT
          ),
          this.classificationRepository.filterClassification(
            { activeFlag: true },
            FilterTypeEnum.WEBLIST_WITH_COUNT
          ),
        ]);
      storeCategories = plainToInstance(
        CategoryModel,
        storeCategories,
        TransformOptions.tranformOptions
      ) as any;
      storeSubCategories = plainToInstance(
        SubCategoryModel,
        storeSubCategories,
        TransformOptions.tranformOptions
      ) as any;
      classications = plainToInstance(
        ClassificationModel,
        classications,
        TransformOptions.tranformOptions
      ) as any;
      return this.buildCategoriesForEcommerce(
        globalCatalogueProducts,
        storeCategories || [],
        storeSubCategories || [],
        subCategoryFilteredIds,
        classications || [],
        classificationFilteredIds,
        filterType,
        storeCatalogs
      );
    } catch (e) {
      console.log(e);
    }
  }

  async buildCategoriesForEcommerce(
    globalCatalogueProductsList: any,
    categories: any,
    storeSubCategoryList: any,
    subCategoryIds: string[],
    classicationList: any,
    classificationIds: string[],
    filterType: string,
    storeCatalogs: any
  ) {
    const response: any = [];
    categories?.forEach((item: any) => {
      let masterCatalogProductIds = globalCatalogueProductsList?.filter(
        (e: any) => {
          return String(e.category._id) == String(item._id);
        }
      );

      let productIds = masterCatalogProductIds.map((product: any) =>
        String(product.productId)
      );
      let priceRange = (storeCatalogs || [])
        .filter((e: any) => productIds?.includes(String(e.productId)))
        .sort((a: any, b: any) => b.salesPrice - a.salesPrice);
      let lowestPrice = priceRange[priceRange.length - 1]?.salesPrice || 0;
      let heighestPrice = priceRange[0]?.salesPrice || 0;
      let urlPath = this.getUrlPath(item, undefined, undefined, filterType);
      if (item.productAllowed) {
        response.push({
          id: item._id,
          categoryName: item?.categoryName,
          productAllowed: item?.productAllowed,
          heighestPrice: heighestPrice,
          lowestPrice: lowestPrice,
          individualWebMedia: this.buildDefaultMediaObject(item?.webMedia),
          individualMobileMedia: this.buildDefaultMediaObject(
            item?.mobileMedia
          ),
          posMedia: this.buildDefaultMediaObject(item?.posMedia),
          seo: item?.seo,
          urlPath,
        });
      } else {
        const filteredSubCategoryIds = storeSubCategoryList
          .filter(
            (subCategory: any) => subCategory.categoryId == String(item.id)
          )
          .map((subCategory: any) => String(subCategory.id));

        let finalSubCategoryIds = getMatchingIds(
          filteredSubCategoryIds,
          subCategoryIds || []
        );

        const subCateObj = this.getSubCategories(
          finalSubCategoryIds,
          storeSubCategoryList,
          item,
          filterType,
          classicationList,
          classificationIds,
          globalCatalogueProductsList,
          storeCatalogs
        );
        subCateObj?.sort((a: any, b: any) => a?.orderValue - b?.orderValue);
        let category = {
          id: item.id,
          categoryName: item?.categoryName,
          orderValue: item?.orderValue,
          productAllowed: item?.productAllowed,
          heighestPrice: heighestPrice,
          lowestPrice: lowestPrice,
          individualWebMedia: this.buildDefaultMediaObject(item?.webMedia),
          individualMobileMedia: this.buildDefaultMediaObject(
            item?.mobileMedia
          ),
          posMedia: this.buildDefaultMediaObject(item.posMedia),
          seo: item?.seo,
          urlPath,
          subCategory: subCateObj,
          productCount: undefined,
        };
        this.getCategoriesWithProductCount(
          filterType,
          globalCatalogueProductsList,
          item,
          category
        );
        response.push(category);
      }
    });

    return response;
  }

  private getCategoriesWithProductCount(
    filterType: string,
    globalCatalogueProductsList: any,
    item: any,
    category: {
      id: any;
      categoryName: any;
      orderValue: any;
      productAllowed: any;
      individualWebMedia: any;
      individualMobileMedia: any;
      posMedia: any;
      seo: any;
      urlPath: string | undefined;
      subCategory: (
        | {
            id: any;
            subCategoryName: any;
            productAllowed: any;
            individualWebMedia: any;
            individualMobileMedia: any;
            posMedia: any;
            seo: any;
            urlPath: string | undefined;
          }
        | {
            classification: {
              id: any;
              classificationName: any;
              individualWebMedia: any;
              individualMobileMedia: any;
              posMedia: any;
              seo: any;
              urlPath: string | undefined;
            }[];
            id: any;
            subCategoryName: any;
            productAllowed: any;
            individualWebMedia: any;
            individualMobileMedia: any;
            posMedia: any;
            seo: any;
            urlPath: string | undefined;
          }
      )[];
      productCount: undefined;
    }
  ) {
    if (filterType === FilterConstants.PRODUCT_COUNT) {
      const productCount = globalCatalogueProductsList?.filter(
        (product: any) => product?.category?._id == item.id
      ).length;
      category.productCount =
        productCount && productCount > 0 ? productCount : 0;
    }
  }

  private getSubCategories(
    finalSubCategoryIds: any[],
    storeSubCategoryList: any,
    item: any,
    filterType: string,
    classicationList: any,
    classificationIds: string[],
    globalCatalogueProductsList: any,
    storeCatalogs: any
  ) {
    return finalSubCategoryIds?.map((subcategoryId: string) => {
      const subCategoryMaster = storeSubCategoryList?.find(
        (sc: any) => subcategoryId == String(sc._id)
      );

      let subCategoriesProductIds = globalCatalogueProductsList?.reduce(
        (acc: any, e: any) => {
          if (String(subcategoryId) == String(e.subCategory?._id))
            acc.push(String(e.productId));
          return acc;
        },
        []
      );

      let priceRange = (storeCatalogs || [])
        .filter((e: any) =>
          subCategoriesProductIds?.includes(String(e.productId))
        )
        .sort((a: any, b: any) => b.salesPrice - a.salesPrice);
      let lowestPrice = priceRange[priceRange.length - 1]?.salesPrice || 0;
      let heighestPrice = priceRange[0]?.salesPrice || 0;

      const subCateUrlPath = this.getUrlPath(
        item,
        subCategoryMaster,
        undefined,
        filterType
      );
      const subcategoryDetails = {
        id: subCategoryMaster?.id,
        orderValue: subCategoryMaster?.orderValue,
        subCategoryName: subCategoryMaster?.subCategoryName,
        productAllowed: subCategoryMaster?.productAllowed,
        individualWebMedia: this.buildDefaultMediaObject(
          subCategoryMaster?.webMedia
        ),
        individualMobileMedia: this.buildDefaultMediaObject(
          subCategoryMaster?.mobileMedia
        ),
        posMedia: this.buildDefaultMediaObject(subCategoryMaster?.posMedia),
        seo: subCategoryMaster?.seo,
        urlPath: subCateUrlPath,
        lowestPrice,
        heighestPrice,
      };

      if (!subCategoryMaster?.productAllowed) {
        const allFilteredClasiIds = classicationList
          ?.filter(
            (classification: any) =>
              String(classification.subCategoryId?._id) ==
              String(subCategoryMaster?.id)
          )
          .map((classification: any) => String(classification.id));

        const finalClassificationIds =
          getMatchingIds(allFilteredClasiIds, classificationIds || []) || [];
        console.log({ allFilteredClasiIds, classificationIds });
        const classificationDetails = finalClassificationIds.map((ids: any) => {
          const classificationMaster = classicationList?.find(
            (iterator: any) => ids === iterator.id
          );

          let classificationProductIds = globalCatalogueProductsList?.reduce(
            (acc: any, e: any) => {
              if (String(ids) == String(e.classication?._id))
                acc.push(String(e.productId));
              return acc;
            },
            []
          );

          priceRange = (storeCatalogs || [])
            .filter((e: any) =>
              classificationProductIds?.includes(String(e.productId))
            )
            .sort((a: any, b: any) => b.salesPrice - a.salesPrice);
          lowestPrice = priceRange[priceRange.length - 1]?.salesPrice || 0;
          heighestPrice = priceRange[0]?.salesPrice || 0;

          const classicationUrlPath = this.getUrlPath(
            item,
            subCategoryMaster,
            classificationMaster,
            filterType
          );

          return {
            id: classificationMaster?.id,
            classificationName: classificationMaster?.classificationName,
            individualWebMedia: this.buildDefaultMediaObject(
              subCategoryMaster?.webMedia
            ),
            individualMobileMedia: this.buildDefaultMediaObject(
              subCategoryMaster?.mobileMedia
            ),
            posMedia: this.buildDefaultMediaObject(subCategoryMaster?.posMedia),
            seo: subCategoryMaster?.seo,
            urlPath: classicationUrlPath,
            lowestPrice,
            heighestPrice,
          };
        });

        return {
          ...subcategoryDetails,
          classification: classificationDetails,
        };
      }

      return subcategoryDetails;
    });
  }

  private getUrlPath(
    item: any,
    subCategoryMaster?: any,
    classificationMaster?: any,
    filterType?: string
  ) {
    const nameParts = [
      item?.categoryName
        ? customUrlTransformation(item.categoryName)
        : undefined,
      subCategoryMaster?.subCategoryName
        ? customUrlTransformation(subCategoryMaster.subCategoryName)
        : undefined,
      classificationMaster?.classificationName
        ? customUrlTransformation(classificationMaster.classificationName)
        : undefined,
    ].filter(Boolean);

    const seoUrl = getSeoUrl(item, subCategoryMaster, classificationMaster);
    const path = nameParts.join("/");
    return `/${seoUrl || path}`;
  }

  async updateManyCategories(
    updateQuery: object,
    updateData: CategoryModel
  ): Promise<void> {
    try {
      let categoryEntity = instanceToPlain(updateData) as ICategoryEntity;
      let result = await this.categoryRepository.updateManyCategories(
        updateQuery,
        categoryEntity
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async findOrCreateCategories(categories: CategoryModel) {
    try {
      let categoryEntity = instanceToPlain(categories) as ICategoryEntity[];

      for (let catagory of categoryEntity) {
        if (catagory?.webMedia && Object.keys(catagory?.webMedia).length > 0) {
          let web = await this.createOrUpdateMediaType(catagory.webMedia);
          catagory.webMedia = web?._id;
        } else delete catagory.webMedia;

        if (
          catagory?.mobileMedia &&
          Object.keys(catagory?.mobileMedia).length > 0
        ) {
          let mobile = await this.createOrUpdateMediaType(catagory.mobileMedia);
          catagory.mobileMedia = mobile?._id;
        } else delete catagory.mobileMedia;
      }

      let bulkOperationQuery = categoryEntity?.map((category) => {
        const { id, _id, businessUnitId, ...updateData } = category;
        let categoryId = id || _id;
        if (categoryId) {
          return {
            updateOne: {
              filter: {
                _id: new mongoose.Types.ObjectId(categoryId),
                businessUnitId: businessUnitId,
                deleteFlag: false,
              },
              update: { $set: { businessUnitId, ...updateData } },
            },
          };
        } else {
          return {
            insertOne: {
              document: category,
            },
          };
        }
      });

      await this.categoryRepository.updateCategories(bulkOperationQuery);
      return await this.categoryRepository.filterCategory({
        categoryNames: categoryEntity.map((e) => e.categoryName),
        businessUnitId: categoryEntity[0]?.businessUnitId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  buildDefaultMediaObject(media: MediaTypeModel) {
    try {
      return {
        _id: media?._id ?? "",
        id: media?.id ?? "",
        media: media?.media ?? "",
        thumbnail: media?.thumbnail ?? "",
        type: media?.type ?? "",
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export default CategoryService;
