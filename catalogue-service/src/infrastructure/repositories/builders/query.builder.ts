import { IGlobalCatalogueVariantEntity } from "../entities/catalogues/global-catalogue-variants.entity";

export const buildQueryForBulkWrite = (bulkVariants: any[]) => {
  const bulkEntities: any = [];
  for (const variantEntity of bulkVariants) {
    if (variantEntity) {
      let variantId = variantEntity?.id || variantEntity._id;
      if (variantId) {
        const { id, ...updateData } = variantEntity;
        bulkEntities.push({
          updateOne: {
            filter: { _id: variantId },
            update: { $set: updateData },
          },
        });
      } else {
        bulkEntities.push({
          insertOne: {
            document: variantEntity,
          },
        });
      }
    }
  }
  return bulkEntities;
};

export const buildQueryForGlobalCatalogBulkWrite = (bulkVariants: any[]) => {
  const bulkEntities: any = [];
  for (const variantEntity of bulkVariants) {
    if (variantEntity) {
      let variantId = variantEntity?.id || variantEntity._id;
      let variantItemCode = variantEntity?.itemCode;
      if (variantId) {
        const { id, ...updateData } = variantEntity;
        bulkEntities.push({
          updateOne: {
            filter: { _id: variantId },
            update: { $set: updateData },
          },
        });
      } else if (variantItemCode) {
        const { itemCode, ...updateData } = variantEntity;
        bulkEntities.push({
          updateOne: {
            filter: { itemCode: variantItemCode },
            update: { $set: updateData },
            upsert: true,
          },
        });
      } else {
        bulkEntities.push({
          insertOne: {
            document: variantEntity,
          },
        });
      }
    }
  }
  return bulkEntities;
};

export const buildQueryForVariantViaItemCode = (
  bulkVariants: IGlobalCatalogueVariantEntity[]
) => {
  const bulkEntities: any = [];
  for (const variantEntity of bulkVariants) {
    if (variantEntity) {
      bulkEntities.push({
        updateOne: {
          filter: { itemCode: variantEntity.itemCode },
          update: { $set: variantEntity },
          upsert: true,
        },
      });
    }
  }
  return bulkEntities;
};
