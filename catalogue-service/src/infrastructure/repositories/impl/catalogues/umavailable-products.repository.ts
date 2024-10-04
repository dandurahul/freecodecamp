import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IUnavailableProductsRepository } from "../../contracts/catalogues/i-unavailable-products.repository";
import { IUnavailableProductsEntity } from "../../entities/catalogues/unavailable-products.entity";
import { buildFilterObjectForStoreCatalogues } from "../../helpers/store-catalogues-filter.helper";
import { buildRequestForForUnavailableProduct } from "../../helpers/unavailable-products.helper";

@injectable()
class UnavailableProductsRepository implements IUnavailableProductsRepository {
  @inject(ContainerTypes.UnavailableProductsRepositoryBase)
  private repositoryBase!: IRepositoryBase<IUnavailableProductsEntity>;

  async filterUnavailableProducts(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<IUnavailableProductsEntity[]> {
    let filter = buildRequestForForUnavailableProduct(filterCriteria);
    return await this.repositoryBase.filter(filter);
  }

  createUnavailableProducts(
    UnavailableProductsEntity: IUnavailableProductsEntity[]
  ): Promise<IUnavailableProductsEntity[]> {
    return this.repositoryBase
      .bulkInsert(UnavailableProductsEntity, {
        ordered: false,
      })
      .catch();
  }

  async deleteUnavailableProducts(filterCriteria: Object): Promise<any> {
    return await this.repositoryBase.bulkDelete(filterCriteria);
  }
}
export default UnavailableProductsRepository;
