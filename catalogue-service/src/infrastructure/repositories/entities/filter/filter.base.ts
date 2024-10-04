export class FilterBase {
  filter!: Object | {};
  fields?: string;
  populate?: string;
  aggregate?: any;
  sort?: string;
  populateFields?: string;
}
