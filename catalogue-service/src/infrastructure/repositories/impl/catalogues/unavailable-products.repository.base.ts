import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import UnavailableProducts, {
  IUnavailableProductsEntity,
} from "../../entities/catalogues/unavailable-products.entity";

@injectable()
export class UnavailableProductsRepositoryBase extends RepositoryBase<IUnavailableProductsEntity> {
  constructor() {
    super(UnavailableProducts);
  }
}
