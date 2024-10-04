import { HighlightFilterModel } from "../../../domain/models/catagories/filter/highlight-filter.model";
import { HighlightModel } from "../../../domain/models/catagories/highlight.model";

export interface IHighlightHelperService {
  syncProductHighlights(
    highlight: HighlightFilterModel,
    filterType: string
  ): Promise<any>;
}
