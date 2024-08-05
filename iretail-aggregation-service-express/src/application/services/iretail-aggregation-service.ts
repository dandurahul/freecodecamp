import { inject, injectable } from "inversify";
import { IIRetailAggregationService } from "../contracts/i-iretail-aggragation.service";
import { ContainerTypes } from "../../api/bindings/container-types";
import { plainToInstance } from "class-transformer";
import { TransformOptions } from "../constants/transform-options";
import { IRetailAdapter } from "../../infrastructure/contracts/iretail-adapter";
import { constants } from "../../api/constants/constants.constants";
import { IStoreProductHistoryAdapter } from "../../infrastructure/contracts/i-store-product-history";
import { ICommonService } from "../contracts/i-common-service";
import { IProductAdapter } from "../../infrastructure/contracts/i-product-adapter";
import { dataSegiragator } from "../utils/common-util-method";

@injectable()
export class IRetailAggregationService implements IIRetailAggregationService {
  @inject(ContainerTypes.IretailAdapter)
  private retailAdapter!: IRetailAdapter;
  @inject(ContainerTypes.StoreProductHistoryAdapter)
  private storeProductHistoryAdapter!: IStoreProductHistoryAdapter;
  @inject(ContainerTypes.CommonService)
  private commonService!: ICommonService;
  @inject(ContainerTypes.productAdapter)
  private productAdapter!: IProductAdapter;

  async BarCodeSync(filterType: any): Promise<any> {
    try {
      const currentDate = "2023-03-02T05:29:19.990Z";
      const batchnumber = 0;
      const batchsize = 500000;
      const batchLimit = 10000;

      const barCodeProducts =
        await this.commonService.TokenGenerationAndGetProducts(
          process.env.MERCHANT_CODE,
          currentDate,
          batchnumber,
          batchsize,
          "",
          constants.BARCODE_TYPE
        );
      const responseBody =
        barCodeProducts?.responseBody?.length > 0
          ? barCodeProducts.responseBody
          : [];
      console.log(responseBody.length);
      const itemCodes = responseBody.map(
        (item: any) => item[constants.PRODUCT_CODE]
      );
      const itemCodeToBar1CodeMap = new Map();
      responseBody.forEach((item: any) => {
        itemCodeToBar1CodeMap.set(item[constants.PRODUCT_CODE], item.bar1Code);
      });
      const batchedItemCodes = [];
      for (let i = 0; i < itemCodes.length; i += batchLimit) {
        batchedItemCodes.push(itemCodes.slice(i, i + batchLimit));
      }
      const filteredProductsPromises = batchedItemCodes.map(
        async (batch: any) => {
          const result = await this.productAdapter.getAllProductsByIds("", {
            itemCode: batch,
          });
          if (result && result.data.length > 0) {
            result?.data.map(async (item: any) => {
              const layoad = [
                {
                  _id: item._id,
                  barcodes: [itemCodeToBar1CodeMap.get(item.itemCode)],
                },
              ];
              console.log(itemCodeToBar1CodeMap.get(item.itemCode));
              await this.productAdapter.updateProductWithBarcodes(layoad);
            });
          }
          if (result.data.length > 0) {
            let globalProducts = dataSegiragator(result, responseBody);
            // this.storeProductHistoryAdapter.createStoreProductHistoryBulk(
            //   result
            // );
            // return globalProducts;
          }
          return result;
        }
      );
      const filteredProducts = (
        await Promise.all(filteredProductsPromises)
      ).flat();
      console.log(
        `Total filtered products received: ${filteredProducts.length}`
      );

      // return productlsit;
      return filteredProducts;
    } catch (error) {
      console.error("Error in BarCodeSync:", error);
      throw error;
    }
  }

  async StockStatusSync(data: any): Promise<any> {
    return plainToInstance(
      await this.retailAdapter.StockCodeSync(data),
      TransformOptions.tranformOptions
    );
  }
  async ProductPriceSync(data: any): Promise<any> {
    return plainToInstance(
      await this.retailAdapter.ProductPriceSync(data),
      TransformOptions.tranformOptions
    );
  }
}
