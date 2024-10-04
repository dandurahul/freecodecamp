export const buildWithProducts = (
  products: any[] = [],
  model: any[] = [],
  field: string
) => {
  return model.map((entity: any) => {
    let productCount = products?.find((item) => item[field] == entity.id);
    entity.productCount = productCount ? productCount.productCount : 0;
    return entity;
  });
};
