import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ICrossSellingProductService } from "../../contracts/cross-selling/i-cross-selling-products.service";
import { ICrossSellingProductsRepository } from "../../../infrastructure/repositories/contracts/cross-selling/i-cross-selling-products.repository";
import { ICrossSellingProductsEntity } from "../../../infrastructure/repositories/entities/cross-selling/cross-selling-products.entity";
import { CrossSellingProductsModel } from "../../../domain/models/cross-selling/cross-selling-products.model";
import { FilterConstants } from "../../constants/filter.constants";
import { CrossSellingProductsFilterModel } from "../../../domain/models/catagories/filter/cross-selling-products-filter.model";

@injectable()
class CrossSellingProductsService implements ICrossSellingProductService {
  @inject(ContainerTypes.CrossSellingProductsRepository)
  private crossSellingProductRepository!: ICrossSellingProductsRepository;

  async createCrossSellingProduct(
    crossSelling: CrossSellingProductsModel
  ): Promise<CrossSellingProductsModel> {
    crossSelling.creationDate = new Date();

    let crossSellingProductEntity = instanceToPlain(
      crossSelling
    ) as ICrossSellingProductsEntity;

    return plainToInstance(CrossSellingProductsModel, await this.crossSellingProductRepository.createCrossSellingProduct(
      crossSellingProductEntity
    ));
  }

  async getAllCrossSellingProducts(
    filterType: string | undefined
  ): Promise<CrossSellingProductsModel[]> {
    return plainToInstance(CrossSellingProductsModel, await this.crossSellingProductRepository.getAllCrossSellingProducts(
      filterType
    )) as any;
  }

  async getCrossSellingProductById(
    id: string
  ): Promise<CrossSellingProductsModel> {
    return plainToInstance(CrossSellingProductsModel, await this.crossSellingProductRepository.getCrossSellingProductById({
      _id: id,
    }));
  }

  async updateCrossSellingProduct(
    id: string,
    crossSellingProduct: CrossSellingProductsModel
  ): Promise<CrossSellingProductsModel> {
    crossSellingProduct.modifiedDate = new Date();
    let crossSellingProductEntity = instanceToPlain(
      crossSellingProduct
    ) as ICrossSellingProductsEntity;
    return plainToInstance(CrossSellingProductsModel, await this.crossSellingProductRepository.updateCrossSellingProduct(
      id,
      crossSellingProductEntity
    ));
  }

  async deleteCrossSellingProduct(id: string): Promise<any> {
    await this.crossSellingProductRepository.deleteCrossSellingProduct(id);
    return {
      message: ErrorMessages.DELETE_CROSS_SELLING_PRODUCT_SUCCESSFULLY,
    };
  }

  async filterCrossSellingProducts(
    crossSellingProduct: CrossSellingProductsFilterModel,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<CrossSellingProductsModel[]> {
    const crossSellingProductEntity = instanceToPlain(
      crossSellingProduct
    ) as ICrossSellingProductsEntity;

    let result =
      filterType === FilterConstants.PAGINATION
        ? await this.crossSellingProductRepository.filterByPagination(
          crossSellingProductEntity
        )
        : await this.crossSellingProductRepository.filterCrossSellingProducts(
          crossSellingProductEntity,
          "",
          "",
          "",
          pageSize,
          page,
        );
    return plainToInstance(CrossSellingProductsModel, result) as any;
  }
}

export default CrossSellingProductsService;
