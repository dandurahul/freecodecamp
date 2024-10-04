import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { StoreCatalogueModel } from "./store-catalogue.model";

@Exclude()
export class StoreCatalogueGroupModel extends BaseModel {
  @Expose()
  @ExposeId()
  entityInternalId!: string;

  @Expose()
  @ExposeId()
  @Type(() => StoreCatalogueModel)
  products!: StoreCatalogueModel[];
}
