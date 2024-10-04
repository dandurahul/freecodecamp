import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { StoreCatalogueDetailsModel } from "./store-catalogue-details.model";
import { PaginationModel } from "../pagination/pagination.model";

@Exclude()
export class CatalogueFilterInfoModel extends BaseModel {
  @Expose()
  @ExposeId()
  @Type(() => StoreCatalogueDetailsModel)
  storeCatalogueProducts!: StoreCatalogueDetailsModel[];
  @Expose()
  @ExposeId()
  @Type(() => PaginationModel)
  pagination?: PaginationModel;
}
