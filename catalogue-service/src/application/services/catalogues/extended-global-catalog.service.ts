import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IExtendedGlobalCatalogRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-extended-global-catalog.repository";
import { ExtendedGlobalCatalogModel } from "../../../domain/models/catalogues/extended-global-catalog.model";
import { IExtendedGlobalCatalogEntity } from "../../../infrastructure/repositories/entities/catalogues/extended-global-catalog.entity";
import { ErrorMessages } from "../../constants/error-messages";
import { IExtendedGlobalCatalogService } from "../../contracts/catalogues/i-extended-global-catalog.service";
import { TransformOptions } from "../../constants/transform-options";
import { FilterConstants } from "../../constants/filter.constants";
import { buildPaginationObject } from "../../builders/pagination.builder";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { removeNonObjectIds } from "../../utils/filter-functions";

@injectable()
class ExtendedGlobalCatalogService implements IExtendedGlobalCatalogService {
  @inject(ContainerTypes.ExtendedGlobalCatalogRepository)
  private ExtendedGlobalCatalogRepository!: IExtendedGlobalCatalogRepository;

  async createExtendedGlobalCatalog(
    extendedGlobalCatalog: ExtendedGlobalCatalogModel
  ): Promise<ExtendedGlobalCatalogModel> {
    extendedGlobalCatalog.creationDate = new Date();
    let extendedGlobalCatalogEntity = instanceToPlain(
      extendedGlobalCatalog
    ) as IExtendedGlobalCatalogEntity;

    let existingExtendedCatalog =
      await this.ExtendedGlobalCatalogRepository.getExtendedGlobalCatalog({
        globalCatalogue: extendedGlobalCatalogEntity.globalCatalogue,
      });
    if (existingExtendedCatalog) {
      existingExtendedCatalog =
        await this.ExtendedGlobalCatalogRepository.updateExtendedGlobalCatalog(
          existingExtendedCatalog._id,
          extendedGlobalCatalogEntity
        );
    } else {
      existingExtendedCatalog =
        await this.ExtendedGlobalCatalogRepository.createExtendedGlobalCatalog(
          extendedGlobalCatalogEntity
        );
    }
    return plainToInstance(ExtendedGlobalCatalogModel, existingExtendedCatalog);
  }

  async getAllExtendedGlobalCatalogDetails(
    filterType: string
  ): Promise<ExtendedGlobalCatalogModel[]> {
    let histories =
      this.ExtendedGlobalCatalogRepository.getAllExtendedGlobalCatalogDetails({
        deleteFlag: false,
      });
    return plainToInstance(ExtendedGlobalCatalogModel, histories) as any;
  }

  //find by id
  async getExtendedGlobalCatalogById(
    _id: string
  ): Promise<ExtendedGlobalCatalogModel> {
    let extendedCatalogue =
      await this.ExtendedGlobalCatalogRepository.getExtendedGlobalCatalog({
        _id,
      });
    return plainToInstance(
      ExtendedGlobalCatalogModel,
      extendedCatalogue,
      TransformOptions.tranformOptions
    );
  }

  async updateExtendedGlobalCatalog(
    id: string,
    extendedGlobalCatalog: ExtendedGlobalCatalogModel
  ): Promise<ExtendedGlobalCatalogModel> {
    extendedGlobalCatalog.modifiedDate = new Date();
    extendedGlobalCatalog = removeNonObjectIds(extendedGlobalCatalog, [
      "categoryId",
      "subCategoryId",
      "classificationId",
    ]);
    let extendedGlobalCatalogEntity = instanceToPlain(
      extendedGlobalCatalog
    ) as IExtendedGlobalCatalogEntity;

    let extendedCatalogue =
      await this.ExtendedGlobalCatalogRepository.updateExtendedGlobalCatalog(
        id,
        extendedGlobalCatalogEntity
      );
    return plainToInstance(ExtendedGlobalCatalogModel, extendedCatalogue);
  }

  async deleteExtendedGlobalCatalog(id: string): Promise<any> {
    await this.ExtendedGlobalCatalogRepository.deleteExtendedGlobalCatalog(id);
    return {
      message: ErrorMessages.DELETE_EXTENDED_CATALOG_SUCCESSFULLY,
    };
  }

  async filterExtendedGlobalCatalog(
    ExtendedGlobalCatalog: ExtendedGlobalCatalogModel,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<any> {
    const ExtendedGlobalCatalogEntity = instanceToPlain(
      ExtendedGlobalCatalog
    ) as IExtendedGlobalCatalogEntity;
    let result;
    if (filterType === FilterConstants.PAGINATION) {
      result =
        await this.ExtendedGlobalCatalogRepository.getExtendedGlobalCatalogCount(
          ExtendedGlobalCatalogEntity
        );
      let pageCountData = buildPaginationObject(result, pageSize);
      return plainToInstance(PaginationModel, pageCountData) as any;
    } else {
      result =
        await this.ExtendedGlobalCatalogRepository.filterExtendedGlobalCatalog(
          ExtendedGlobalCatalogEntity,
          filterType,
          pageSize,
          page
        );
    }

    return plainToInstance(
      ExtendedGlobalCatalogModel,
      result,
      TransformOptions.tranformOptions
    ) as any;
  }

  async updateExtendedGlobalCatalogues(
    extendedGlobalCatalogs: any[]
  ): Promise<any> {
    let bulkOperationQuery: any = extendedGlobalCatalogs.map((catalog) => {
      return {
        updateOne: {
          filter: {
            globalCatalogue: catalog.globalCatalogue,
            deleteFlag: false,
          },
          update: {
            $set: catalog,
          },
          upsert: true,
        },
      };
    });
    return await this.ExtendedGlobalCatalogRepository.bulkWrite(
      bulkOperationQuery
    );
  }

  async bulkUpdateForExtendedCatalogues(
    query: object,
    catalogueEntity: ExtendedGlobalCatalogModel
  ): Promise<ExtendedGlobalCatalogModel> {
    catalogueEntity.modifiedDate = new Date();
    let catalogueEntityEntity = instanceToPlain(
      catalogueEntity
    ) as IExtendedGlobalCatalogEntity;
    let extendedCatalogue =
      await this.ExtendedGlobalCatalogRepository.updateMany(
        query,
        catalogueEntityEntity
      );
    return extendedCatalogue as any;
  }
}

export default ExtendedGlobalCatalogService;
