import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IUnavailableProductsRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-unavailable-products.repository";
import { IUnavailableProductsEntity } from "../../../infrastructure/repositories/entities/catalogues/unavailable-products.entity";
import { TransformOptions } from "../../constants/transform-options";
import { IUnavailableProductsService } from "../../contracts/catalogues/i-unavailable-products.service";
import { buildWithProducts } from "../../helpers/categorization.helper";
import { UnavailableProductModel } from "../../../domain/models/catalogues/unavailable-products.model";
import moment from "moment";


@injectable()
class UnavailableProductsService implements IUnavailableProductsService {
  @inject(ContainerTypes.UnavailableProductsRepository)
  private unavailableProductsRepository!: IUnavailableProductsRepository;

  async filterUnavailableProducts(
    query: any,
    filterType: string | undefined,
    page: number,
    pageSize: number
  ): Promise<UnavailableProductModel[]> {
    let result = plainToInstance(
      UnavailableProductModel,
      await this.unavailableProductsRepository.filterUnavailableProducts(
        query,
        filterType,
        page,
        pageSize
      ),
      TransformOptions.tranformOptions
    ) as any;

    if(query.startDate && query.endDate){
      let deleteBefore = moment(query.startDate).subtract(7,'d')
        await this.unavailableProductsRepository.deleteUnavailableProducts({creationDate:{$lte:deleteBefore}})
    }
    return result
  }


  createUnavailableProducts(
    unavailableProductsModels: UnavailableProductModel[]
  ): Promise<UnavailableProductModel[]> {
    let unavailableProductsEntity = instanceToPlain(
      unavailableProductsModels
    ) as IUnavailableProductsEntity[];

    return plainToInstance(
      UnavailableProductModel,
      this.unavailableProductsRepository.createUnavailableProducts(
        unavailableProductsEntity
      )
    ) as any;
  }
}

export default UnavailableProductsService;
