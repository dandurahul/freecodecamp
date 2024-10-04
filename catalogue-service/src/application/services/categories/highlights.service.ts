import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { IMediaTypeEntity } from "../../../infrastructure/repositories/entities/imedia-type.entity";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { IMediaTypeRepository } from "../../../infrastructure/repositories/contracts/i-media-type.repository";
import { SeoModel } from "../../../domain/models/seo.model";
import { MediaTypeModel } from "../../../domain/models/media-type.model";
import { TransformOptions } from "../../constants/transform-options";
import { IHighlightService } from "../../contracts/categories/i-product-highlight.service";
import { IProductHighlightRepository } from "../../../infrastructure/repositories/contracts/catagories/i-product-highlight.repository";
import { IProductHighlightEntity } from "../../../infrastructure/repositories/entities/categories/product-highlight.entity";
import { HighlightModel } from "../../../domain/models/catagories/highlight.model";
import { IHighlightHelperService } from "../../contracts/helper/i-highlight.helper.service";
import { HighlightFilterModel } from "../../../domain/models/catagories/filter/highlight-filter.model";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { FilterConstants } from "../../constants/filter.constants";
import FilterTypeEnum from "../../../infrastructure/enums/filter.enum";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { buildPaginationObject } from "../../builders/pagination.builder";
import { appError } from "../../../api/models/global-error-handler.model";

@injectable()
class HighlightService implements IHighlightService {
  @inject(ContainerTypes.ProductHighlightRepository)
  private highlightRepository!: IProductHighlightRepository;
  @inject(ContainerTypes.MediaTypeRepository)
  private mediaTypeRepository!: IMediaTypeRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.HighlightHelperService)
  private highlightHelperService!: IHighlightHelperService;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  private _highlightEntity!: IProductHighlightEntity;

  async createHighlight(highlight: HighlightModel): Promise<HighlightModel> {
    let existingHighlight =
      await this.highlightRepository.filterProductHighlight({
        highlightName: highlight.productHighlight,
      });
    if (existingHighlight?.length)
      throw appError(ErrorMessages.DUPLICATE_HIGHLIGHT, 400);

    let seoEntity = await this.createOrUpdateSeo(highlight?.seo);
    let webMedia = await this.createOrUpdateMediaType(highlight?.webBanner);
    let mobileMedia = await this.createOrUpdateMediaType(
      highlight?.mobileBanner
    );

    this._highlightEntity = instanceToPlain(
      highlight
    ) as IProductHighlightEntity;

    this.assignDepdentEntities(seoEntity, webMedia, mobileMedia);

    let highlightResponse =
      await this.highlightRepository.createProductHighlight(
        this._highlightEntity
      );
    return plainToInstance(
      HighlightModel,
      highlightResponse,
      TransformOptions.tranformOptions
    ) as HighlightModel;
  }

  async getAllHighlights(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<HighlightModel[]> {
    try {
      let highlights = await this.highlightRepository.filterProductHighlight(
        {},
        filterType,
        pageSize,
        page
      );
      if (
        process.env.SYNC_FLAG_FOR_CATALOGUE === FilterConstants.TRUE &&
        filterType === FilterTypeEnum.WEBLIST_WITH_COUNT
      ) {
        highlights = await this.updateHighlightsWithCatalogueSyncFlagRevised(
          highlights,
          ""
        );
      }
      return plainToInstance(
        HighlightModel,
        highlights,
        TransformOptions.tranformOptions
      ) as any;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private async updateHighlightsWithCatalogueSyncFlag(
    highlights: IProductHighlightEntity[]
  ) {
    const highlightIds = highlights?.map((item) => item.id);
    const globalCatalogue =
      await this.globalCatalogueRepository.filterGlobalCatalogues({
        highlights: highlightIds,
      });
    const productIds = globalCatalogue?.map((e) => e.productId);
    const [unSyncedHighlightIds] =
      await this.storeCatalogueRepository.fetchUnsyncedHighlightIds(
        highlightIds,
        productIds
      );
    highlights = highlights
      ?.map((highlight: any) => {
        const syncHighlight =
          !unSyncedHighlightIds?.highlightIds.includes(String(highlight._id)) &&
          highlight.productCount !== 0;
        return { ...highlight, syncHighlight };
      })
      .sort((a, b) => {
        if (a?.syncHighlight !== b?.syncHighlight) {
          return a.syncHighlight ? -1 : 1;
        }
        return a?.productHighlight?.localeCompare(b?.productHighlight);
      });
    return highlights;
  }

  private async updateHighlightsWithCatalogueSyncFlagRevised(
    highlights: IProductHighlightEntity[],
    businessUnitId: string
  ) {
    const highlightIds = highlights?.map((item) => item._id);
    const globalCatalogue =
      await this.globalCatalogueRepository.groupByHighlightIds(
        highlightIds,
        businessUnitId
      );

    const [unSyncedHighlightIds] =
      await this.storeCatalogueRepository.fetchUnsyncedHighlightIdsBasedOnProductIds(
        globalCatalogue
      );
    highlights?.forEach((highlight: any) => {
      highlight.syncHighlight = Boolean(
        unSyncedHighlightIds?.[highlight._id]?.length
      );
      highlight.productCount =
        globalCatalogue.find((e: any) => e.highlightId == String(highlight._id))
          ?.productIds?.length || 0;
    });
    return highlights;
  }

  //find by id
  async getHighlightById(id: string): Promise<HighlightModel> {
    try {
      let highlight = await this.highlightRepository.getProductHighlight(id);
      return plainToInstance(
        HighlightModel,
        highlight,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateHighlight(
    id: string,
    highlight: HighlightModel
  ): Promise<HighlightModel> {
    let seoEntity = await this.createOrUpdateSeo(highlight?.seo);
    let webMedia = await this.createOrUpdateMediaType(highlight?.webBanner);
    let mobileMedia = await this.createOrUpdateMediaType(
      highlight?.mobileBanner
    );

    this._highlightEntity = instanceToPlain(
      highlight
    ) as IProductHighlightEntity;

    this.assignDepdentEntities(seoEntity, webMedia, mobileMedia);

    try {
      let highlightResponse = this.highlightRepository.updateProductHighlight(
        id,
        this._highlightEntity
      );
      return plainToInstance(
        HighlightModel,
        highlightResponse,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private assignDepdentEntities(
    seoEntity: ISeoEntity | undefined,
    webMedia: IMediaTypeEntity | undefined,
    mobileMedia: IMediaTypeEntity | undefined
  ) {
    this._highlightEntity.seo = seoEntity?._id;
    this._highlightEntity.webBanner = webMedia?._id;
    this._highlightEntity.mobileBanner = mobileMedia?._id;
  }

  async deleteHighlight(id: string): Promise<void> {
    let result: any;
    try {
      await this.highlightRepository.deleteProductHighlight(id);
      result = {
        message: ErrorMessages.CATEGORY_DELETED_SUCCESSFULLY,
      };
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async filterHighlights(
    filterCriteria: HighlightFilterModel,
    filterType?: string,
    pageSize?: number,
    page?: number
  ): Promise<HighlightModel[]> {
    let highlights = await this.highlightRepository.filterProductHighlight(
      filterCriteria,
      filterType === FilterTypeEnum.WEBLIST_WITH_COUNT ? "" : filterType,
      pageSize,
      page
    );
    if (
      // process.env.SYNC_FLAG_FOR_CATALOGUE === FilterConstants.TRUE &&
      filterType === FilterTypeEnum.WEBLIST_WITH_COUNT
    ) {
      highlights = await this.updateHighlightsWithCatalogueSyncFlagRevised(
        highlights,
        filterCriteria.businessUnitId
      );
    }
    return plainToInstance(
      HighlightModel,
      highlights,
      TransformOptions.tranformOptions
    ) as any;
  }

  async paginationByFilter(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.highlightRepository.paginationByFilter(
      filterCriteria
    );
    return buildPaginationObject(count, pageSize);
  }

  createHighlights(
    highlightModels: HighlightModel[]
  ): Promise<HighlightModel[]> {
    let highlightEntity = instanceToPlain(
      highlightModels
    ) as IProductHighlightEntity[];

    return plainToInstance(
      HighlightModel,
      this.highlightRepository.createProductHighlights(highlightEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateHighlights(
    highlightModels: HighlightModel[]
  ): Promise<HighlightModel[]> {
    let highlightEntity = instanceToPlain(
      highlightModels
    ) as IProductHighlightEntity[];

    return plainToInstance(
      HighlightModel,
      this.highlightRepository.updateProductHighlights(highlightEntity),
      TransformOptions.tranformOptions
    ) as any;
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

  async syncProductHighlights(
    highlight: HighlightFilterModel,
    filterType: string
  ) {
    try {
      let highlightEntity = instanceToPlain(highlight) as HighlightFilterModel;
      return await this.highlightHelperService.syncProductHighlights(
        highlightEntity,
        filterType
      );
    } catch (error) {
      throw error;
    }
  }

  async updateManyHighlights(
    updateQuery: object,
    updateData: HighlightModel
  ): Promise<void> {
    try {
      let highlightEntity = instanceToPlain(
        updateData
      ) as IProductHighlightEntity;
      let result = await this.highlightRepository.updateManyProductHighlights(
        updateQuery,
        highlightEntity
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async findOrCreateHighlights(highlight: HighlightModel) {
    try {
      let highlightEntity = instanceToPlain(
        highlight
      ) as IProductHighlightEntity[];
      let bulkOperationQuery = highlightEntity.map((item) => {
        return {
          updateOne: {
            filter: {
              productHighlight: {
                $regex: item.productHighlight
                  ? new RegExp(item.productHighlight, "i")
                  : undefined,
              },
            },
            update: {
              $setOnInsert: item,
            },
            upsert: true,
          },
        };
      });

      await this.highlightRepository.updateProductHighlights(
        bulkOperationQuery
      );
      return await this.highlightRepository.filterProductHighlight({
        productHighlights: highlightEntity.map((e) => e.productHighlight),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default HighlightService;
