import { Exclude, Expose } from 'class-transformer';
import 'reflect-metadata';

@Exclude()
export class PaginationModel {
  @Expose()
  noOfPages!: number;
  @Expose()
  pageCount!: number;
  @Expose()
  pageSize!: number;
}
