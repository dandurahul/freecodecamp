import { IProductHighlightEntity } from "../../entities/categories/product-highlight.entity";

export interface IProductHighlightRepository {
  createProductHighlight(
    productHighlightEntity: IProductHighlightEntity
  ): Promise<IProductHighlightEntity>;
  createProductHighlights(
    productHighlightEntity: IProductHighlightEntity[]
  ): Promise<IProductHighlightEntity[]>;
  getProductHighlight(id: any): Promise<IProductHighlightEntity>;
  getAllHighlights(query: any): Promise<IProductHighlightEntity[]>;
  updateProductHighlight(
    id: string,
    productHighlightEntity: IProductHighlightEntity
  ): Promise<IProductHighlightEntity>;
  deleteProductHighlight(id: string): Promise<void>;
  filterProductHighlight(
    filterCriteria: object,
    filterType?: String,
    pageSize?: number,
    page?: number
  ): Promise<IProductHighlightEntity[]>;
  updateProductHighlights(productHighlightEntity: any[]): Promise<void>;

  updateManyProductHighlights(
    updateQuery: object,
    updateData: IProductHighlightEntity
  ): Promise<void>;
  paginationByFilter(filterCriteria: any): Promise<any>;
}
