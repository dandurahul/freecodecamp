import { injectable } from "inversify";
import { RepositoryBase } from "../../repository-base";
import videoReels, { IReelSalesEntity } from "../../entities/reel-sales/reel-sales.entity";

@injectable()
export class ReelSalesRepositoryBase extends RepositoryBase<IReelSalesEntity> {
  constructor() {
    super(videoReels);
  }
}
