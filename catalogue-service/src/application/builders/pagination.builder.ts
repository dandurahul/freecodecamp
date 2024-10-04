import { PaginationModel } from "../../domain/models/pagination/pagination.model";

export const buildPaginationObject = (
  pageCount: number,
  pageSize: number
): PaginationModel => {
  return {
    pageSize: pageSize,
    pageCount: pageCount,
    noOfPages: pageSize ? pageCount / pageSize : 1,
  };
};

export const buildProductFilterResponse = (
  productList: any,
  totalCount: number,
  pageSize: number | undefined
) => {
  let result: any;
  const size = pageSize ? totalCount / pageSize : 1;
  result = Promise.resolve({
    data: productList,
    pagination: {
      pageCount: totalCount,
      pageSize: pageSize,
      noOfPages: size,
    },
  }).catch();
  return result;
};
