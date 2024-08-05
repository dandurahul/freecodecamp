import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../api/bindings/container-types";
import { IAdminAdapter } from "../../infrastructure/contracts/i-admin-adapter";
import { IAdminAggregationService } from "../contracts/i-admin-aggregation.service";

@injectable()
export class AdminAggregationService implements IAdminAggregationService {
  @inject(ContainerTypes.AdminAdapter)
  private adminAdapter!: IAdminAdapter;
  async getCurrency(): Promise<any> {
    let globalSetting:any = await this.adminAdapter.getGlobalSettings();
    let storeCurrency :any =
      globalSetting && globalSetting[0] && globalSetting[0].storeCurrency
        ? globalSetting[0].storeCurrency
        : undefined;
    let globalCurrency:any;
    if (storeCurrency) {
      globalCurrency = await this.adminAdapter.getAllCurrenciesByID();
    }
    let currencyDecimals:any =
      globalCurrency && globalCurrency.currencyDecimals
        ? globalCurrency.currencyDecimals
        : 2;
    return currencyDecimals;
  }
}
