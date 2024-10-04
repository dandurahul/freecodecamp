import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import CrossSellingProducts, {
  ICrossSellingProductsEntity,
} from "../../entities/cross-selling/cross-selling-products.entity";

@injectable()
export class CrossSellingProductsRepositoryBase extends RepositoryBase<ICrossSellingProductsEntity> {
  constructor() {
    super(CrossSellingProducts);
  }
}
