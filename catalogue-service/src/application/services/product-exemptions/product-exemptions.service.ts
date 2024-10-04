import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ProductExemptionFilterModel } from "../../../domain/models/exemptions/product-exemption-filter.model.";
import { IProductExemptionsService } from "../../contracts/product-exemptions/i-product-exemptions.service";
import { IProductExemptionRepository } from "../../../infrastructure/repositories/contracts/exemptions/i-product-exemption.repository";
import { IProductExemptionEntity } from "../../../infrastructure/repositories/entities/exemptions/product-exemptions.entity";
import { ProductExemptionModel } from "../../../domain/models/exemptions/product-exemption.model";
import { FilterConstants } from "../../constants/filter.constants";
import { ProductExemptionFilterEntity } from "../../../infrastructure/repositories/entities/filter/product-exmptions-filter.entity";

@injectable()
class ProductExemptionsService implements IProductExemptionsService {
  @inject(ContainerTypes.ProductExemptionsRepository)
  private productExcemptionsRepository!: IProductExemptionRepository;

  async createProductExemption(
    productExemption: ProductExemptionModel
  ): Promise<ProductExemptionModel> {
    let productExemptionEntity = instanceToPlain(
      productExemption
    ) as IProductExemptionEntity;

    return plainToInstance(ProductExemptionModel, await this.productExcemptionsRepository.createProductExemption(
      productExemptionEntity
    ));
  }

  async getAllProductExemptions(
    filterType: string,
    activeFlag: string
  ): Promise<ProductExemptionModel[]> {
    return plainToInstance(ProductExemptionModel, this.productExcemptionsRepository.getAllProductExemptions(
      filterType,
      activeFlag
    )) as any;
  }

  async getProductExemptionById(id: string): Promise<ProductExemptionModel> {
    return plainToInstance(ProductExemptionModel, await this.productExcemptionsRepository.getProductExemptionById({
      _id: id,
    }));
  }

  async updateProductExemption(
    id: string,
    productExemption: ProductExemptionModel
  ): Promise<ProductExemptionModel> {
    productExemption.modifiedDate = new Date();
    let productExemptionEntity = instanceToPlain(
      productExemption
    ) as IProductExemptionEntity;

    return plainToInstance(ProductExemptionModel, await this.productExcemptionsRepository.updateProductExemption(
      id,
      productExemptionEntity
    ));
  }

  async deleteProductExemption(id: string): Promise<any> {
    await this.productExcemptionsRepository.deleteProductExemption(id);
    return {
      message: ErrorMessages.DELETE_PRODUCT_EXEMPTIONS_SUCCESSFULLY,
    };
  }

  async filterProductExemptions(
    productExemption: ProductExemptionFilterModel,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<ProductExemptionModel[]> {

    const productExemptionEntity = instanceToPlain(
      productExemption
    ) as ProductExemptionFilterEntity;
    let result =
      filterType === FilterConstants.PAGINATION
        ? await this.productExcemptionsRepository.filterByPagination(
          productExemptionEntity
        )
        : await this.productExcemptionsRepository.filterProductExemptions(
          productExemptionEntity,
          "",
          filterType,
          "",
          page,
          pageSize
        );
    return plainToInstance(ProductExemptionModel, result) as any;
  }
}

export default ProductExemptionsService;
