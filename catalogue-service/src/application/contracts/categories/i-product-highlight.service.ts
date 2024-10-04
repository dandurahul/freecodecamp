import { HighlightFilterModel } from "../../../domain/models/catagories/filter/highlight-filter.model";
import { HighlightModel } from "../../../domain/models/catagories/highlight.model";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";

export interface IHighlightService {
  createHighlight(highlight: HighlightModel): Promise<HighlightModel>;

  getHighlightById(_id: string): Promise<HighlightModel>;
  getAllHighlights(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<HighlightModel[]>;
  updateHighlight(
    id: string,
    highlight: HighlightModel
  ): Promise<HighlightModel>;
  deleteHighlight(id: string): Promise<void>;
  filterHighlights(
    filterCriteria: HighlightFilterModel,
    filterType?: string,
    pageSize?: number,
    page?: number
  ): Promise<HighlightModel[]>;
  createHighlights(highlights: HighlightModel[]): Promise<HighlightModel[]>;
  updateHighlights(highlights: HighlightModel[]): Promise<HighlightModel[]>;
  syncProductHighlights(
    highlight: HighlightFilterModel,
    filterType: string
  ): Promise<Object>;
  updateManyHighlights(
    updateQuery: object,
    updateData: HighlightModel
  ): Promise<void>;
  findOrCreateHighlights(classification: HighlightModel): Promise<any>;
  paginationByFilter(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel>;
}
