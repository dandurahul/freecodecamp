import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { IReservedQuantityService } from "../../contracts/reserved/i-reserved-quantity.service";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ReserveQuantityModel } from "../../../domain/models/reserved/reserved-quantity.model";
import { IReservedQuantityEntity } from "../../../infrastructure/repositories/entities/reserved/reserved-quantity.entity";
import { ReserveQuantityFilterModel } from "../../../domain/models/reserved/reserved-quantity-filter.model";
import { ReservedQuantityFilterEntity } from "../../../infrastructure/repositories/entities/filter/reserved-quantity-filter.entity";
import { IReservedQuantityRepository } from "../../../infrastructure/repositories/contracts/reserved/i-reserved-quantity.repository";
import { FilterConstants } from "../../constants/filter.constants";
import { IStoreCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue-variant.repository";
import { BulkReserveQuantityModel } from "../../../domain/models/reserved/reserved-quantity-bulk.model";
import { ReservedQuantityBulkEntity } from "../../../infrastructure/repositories/entities/filter/reserved-quantity-bulk.entity";
import mongoose, { UpdateWriteOpResult } from "mongoose";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";

@injectable()
class ReservedQuantityService implements IReservedQuantityService {
  @inject(ContainerTypes.ReservedQuantityRepository)
  private reservedQuantityRepository!: IReservedQuantityRepository;
  @inject(ContainerTypes.StoreCatalogueVariantRepository)
  private storeCatalogueVariantRepository!: IStoreCatalogueVariantRepository;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async createReservedQuantity(
    reservedQuantity: ReserveQuantityModel
  ): Promise<ReserveQuantityModel> {
    reservedQuantity.creationDate = new Date();
    let reservedQuantityEntity = instanceToPlain(
      reservedQuantity
    ) as IReservedQuantityEntity;

    let createdHistory =
      await this.reservedQuantityRepository.createReservedQuantity(
        reservedQuantityEntity
      );
    return plainToInstance(ReserveQuantityModel, createdHistory);
  }

  async getAllReservedQuantityDetails(
    filterCriteria: Object,
    filterType: string
  ): Promise<ReserveQuantityModel[]> {
    try {
      let histories =
        this.reservedQuantityRepository.getAllReservedQuantityDetails({
          deleteFlag: false,
        });
      return plainToInstance(ReserveQuantityModel, histories) as any;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  //find by id
  async getReservedQuantityById(_id: string): Promise<ReserveQuantityModel> {
    try {
      let history = await this.reservedQuantityRepository.getReservedQuantity({
        _id,
      });
      return plainToInstance(ReserveQuantityModel, history);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateReservedQuantity(
    id: string,
    reservedQuantity: ReserveQuantityModel
  ): Promise<ReserveQuantityModel> {
    reservedQuantity.modifiedDate = new Date();
    let reservedQuantityEntity = instanceToPlain(
      reservedQuantity
    ) as IReservedQuantityEntity;
    try {
      let history = this.reservedQuantityRepository.updateReservedQuantity(
        id,
        reservedQuantityEntity
      );
      return plainToInstance(ReserveQuantityModel, history);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteReservedQuantity(id: string): Promise<void> {
    let result: any;
    try {
      await this.reservedQuantityRepository.deleteReservedQuantity(id);
      result = {
        message: ErrorMessages.DELETE_RESERVED_QUANTITY_SUCCESSFULLY,
      };
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async filterReservedQuantity(
    reservedQuantity: ReserveQuantityFilterModel,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<any> {
    let result: IReservedQuantityEntity[] = [];
    try {
      const reservedQuantityEntity = instanceToPlain(
        reservedQuantity
      ) as ReservedQuantityFilterEntity;

      result = await this.reservedQuantityRepository.filterReservedQuantity(
        reservedQuantityEntity,
        pageSize,
        page,
        ""
      );
      if (filterType === FilterConstants.SUM_FOR_RESERVED_QUANTITY) {
        return this.getReservedQuantitySum(result);
      }
    } catch (e) {}
    return plainToInstance(ReserveQuantityModel, result) as any;
  }

  private getReservedQuantitySum(reservedList: any) {
    try {
      let sumList: any[] = [];
      for (let iterator of reservedList || []) {
        const existingItem = sumList?.find(
          (item: any) => String(item.productId) === String(iterator?.productId)
        );

        if (existingItem) {
          existingItem.reservedCount += iterator?.reservedQuantity || 0;
        } else {
          sumList.push({
            entityInternalId: iterator?.entityInternalId,
            productId: iterator?.productId,
            variantIndex: iterator?.variantIndex,
            reservedCount: iterator?.reservedQuantity || 0,
          });
        }
      }
      return sumList;
    } catch (e) {}
  }

  async updateReservedQuantityWithStockDetails(
    reservedQuantity: BulkReserveQuantityModel,
    filterType: string | undefined
  ): Promise<ReserveQuantityModel[]> {
    let result: any = [];
    try {
      const reservedQuantityEntity = instanceToPlain(
        reservedQuantity
      ) as ReservedQuantityBulkEntity;

      if (!reservedQuantityEntity) {
        return [];
      }
      const reservedQuantityArray =
        reservedQuantityEntity?.data?.length > 0
          ? reservedQuantityEntity.data
          : [];
      const orderId = reservedQuantityEntity?.orderId;
      const status = reservedQuantityEntity?.status;

      if (status === FilterConstants.RETURN_COMPLETED) {
        await this.updateStoreCatalogue(reservedQuantityArray, orderId, true);
      } else if (
        status === FilterConstants.REJECTED ||
        status === FilterConstants.CANCELLED ||
        status === FilterConstants.RESET_RESERVED
      ) {
        await this.updateReservedQuantityHistory(orderId);
      } else {
        result = await this.syncReservedQuantityHistory(
          orderId,
          reservedQuantityArray
        );
        result?.length > 0 && status === FilterConstants.PICKING_COMPLETED
          ? await this.updateStoreCatalogue(result, orderId, false)
          : [];
      }
    } catch (e) {
      console.error(e);
    }
    return plainToInstance(ReserveQuantityModel, result) as any;
  }

  async syncReservedQuantityHistory(
    orderId: string | undefined,
    reservedQuantityArray: any[]
  ): Promise<void> {
    try {
      const deleteResult = await this.deleteReservedQuantities(orderId);
      const modifiedArray = reservedQuantityArray.map((iterator) => {
        iterator.creationDate = new Date();
        return JSON.parse(JSON.stringify(iterator));
      });
      if (deleteResult.deletedCount === 0 || deleteResult.deletedCount) {
        return this.insertReservedQuantities(modifiedArray) as any;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  async deleteReservedQuantities(orderId: string | undefined) {
    try {
      return await this.reservedQuantityRepository.bulkDelete({
        orderId: orderId,
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  async insertReservedQuantities(reservedQuantities: any[]) {
    try {
      return await this.reservedQuantityRepository.bulkInsert(
        reservedQuantities
      );
    } catch (err: any) {
      console.error(err);
    }
  }

  async updateStoreCatalogue(
    reservedList: any[],
    orderId: string | undefined,
    increment: boolean
  ): Promise<UpdateWriteOpResult> {
    const bulkOperations: any = [];
    let storeProducts =
      await this.storeCatalogueRepository.filterStoreCatalogues(
        {
          entityInternalIds: reservedList?.map((item) => item.entityInternalId),
          productIds: reservedList?.map((item) => item.productId),
        },
        FilterConstants.WITH_VARIANTS
      );
    reservedList?.forEach((item) => {
      let variant: any = this.getVariant(item, storeProducts);
      if (variant) {
        const stockUpdateQuery = {
          updateOne: {
            filter: {
              _id: variant._id,
            },
            update: {
              $inc: {
                stockBalance: increment
                  ? item.reservedQuantity || 0
                  : -(item.reservedQuantity || 0),
              },
            },
          },
        };
        bulkOperations.push(stockUpdateQuery);
      }
    });
    try {
      const result =
        await this.storeCatalogueVariantRepository.bulkWriteForReservedQuantity(
          bulkOperations
        );
      if (orderId) {
        await this.updateReservedQuantityHistory(orderId);
      }
      return result;
    } catch (err: any) {
      return {
        modifiedCount: 0,
        upsertedCount: 0,
        matchedCount: 0,
      } as UpdateWriteOpResult;
    }
  }

  private getVariant(item: any, storeProducts: IStoreCatalogueEntity[]) {
    let productId = item?.productId;
    let entityInternalId = item?.entityInternalId;
    let variantIndex = item.variantIndex ? parseInt(item.variantIndex) : 0;
    let storeProduct = storeProducts.find(
      (product: any) =>
        String(product.productId) === String(productId) &&
        String(product.entityInternalId) === String(entityInternalId)
    );
    let variant: any = storeProduct?.variants?.find(
      (variant: any) => variant.productVariantIndex === variantIndex
    );
    return variant;
  }

  async updateReservedQuantityHistory(
    orderId: string | undefined
  ): Promise<void> {
    try {
      const statusUpdateQuery: any = {
        status: FilterConstants.INACTIVE,
      };
      const filter = {
        orderId: orderId,
      };
      await this.reservedQuantityRepository.updateMany(
        filter,
        statusUpdateQuery
      );
    } catch (err: any) {
      console.log(err);
    }
  }
}

export default ReservedQuantityService;
