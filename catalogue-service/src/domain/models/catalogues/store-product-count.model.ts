import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";

@Exclude()
export class StoreProductCountModel {
  @Expose()
  entityInternalId!: string;
  @Expose()
  productsCount!: string;
}
