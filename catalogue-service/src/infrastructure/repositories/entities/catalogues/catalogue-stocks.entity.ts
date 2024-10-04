import { Document, ResolveSchemaOptions, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface ICatalogueStockEntity extends IEntityBase, Document {
  businessUnitId: string;
  productId: string;
  itemCode: string;
  stores: [
    {
      entityInternalId: string;
      stockBalance: number;
      StockType: boolean;
    }
  ];
}

export const CatalogueStockEntitySchema = new Schema(
  {
    businessUnitId: String,
    productId: String,
    itemCode: String,
    stores: [
      {
        entityInternalId: String,
        stockBalance: Number,
        StockType: Boolean,
      },
    ],
  }
);

CatalogueStockEntitySchema.set('toJSON', { virtuals: true });
CatalogueStockEntitySchema.set('toObject', { virtuals: true });

CatalogueStockEntitySchema.virtual("totalStock").get(function () {
  return (this as any).stores.reduce(
    (acc: any, e: any) => acc + e.stockBalance,
    0
  );
});

const CatalgueStock = model<ICatalogueStockEntity>(
  EntityConstants.CATALOGUE_STOCK_MODEL_NAME, // Model name
  CatalogueStockEntitySchema, // Schema
  EntityConstants.CATALOGUE_STOCK_COLLECTION_NAME //collection name
);

export default CatalgueStock;
