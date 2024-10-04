import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import CatalgueStock, {
  ICatalogueStockEntity,
} from "../../entities/catalogues/catalogue-stocks.entity";

@injectable()
export class CatalogueStockRepositoryBase extends RepositoryBase<ICatalogueStockEntity> {
  constructor() {
    super(CatalgueStock);
  }
}
