import { inject, injectable } from "inversify";
import { ICommonService } from "../contracts/i-common-service";
import { ContainerTypes } from "../../api/bindings/container-types";
import { IStoreCatelogAdapter } from "../../infrastructure/contracts/store-catelog-adapter";
import { IProductAdapter } from "../../infrastructure/contracts/i-product-adapter";
import { constants } from "../../api/constants/constants.constants";
import IretailAdapter from "../../infrastructure/adapters/internal/iretail.adapter";

@injectable()
export class CommonService implements ICommonService {
  @inject(ContainerTypes.storeAdapter)
  private storeCatelogAdapter!: IStoreCatelogAdapter;
  @inject(ContainerTypes.productAdapter)
  private productAdapter!: IProductAdapter;
  @inject(ContainerTypes.IretailAdapter)
  private retailAdapter!: IretailAdapter;
  async getRequiredDataForQuantity(
    entityInternalId: any,
    orderProduct: any
  ): Promise<any> {
    let requestProductIds =
      orderProduct &&
      orderProduct.map((item: any) => {
        return item.productId;
      });
    let productIds = [...new Set(requestProductIds)];
    let productDetails: any = await Promise.all([
      await this.storeCatelogAdapter.getStoreCatelogProducts(
        { entityInternalId, productIds },
        constants.WITH_VARIANTS,
        0,
        0
      ),
      await this.productAdapter.getAllUnits(""),
      await this.productAdapter.getAllProductsByIds(productIds, ""),
    ]);
    let storeProductList =
      productDetails?.[0]?.length > 0 ? productDetails[0] : [];
    let unitList =
      productDetails && productDetails[1] && productDetails[1].length > 0
        ? productDetails[1]
        : [];
    let globalProductList =
      productDetails && productDetails[2] && productDetails[2].length > 0
        ? productDetails[2]
        : [];

    return {
      storeProductList: storeProductList,
      unitList: unitList,
      globalProductList: globalProductList,
    };
  }
  // async DefaultTokenGenerationAndGetProducts(
  //   MERCHANT_CODE: any,
  //   currentDate: any,
  //   type: any,
  //   erpStoreCode: any
  // ) {
  //   let headerWithOutToken = await this.headerForIretail(
  //     MERCHANT_CODE,
  //     currentDate,
  //     false,
  //     false,
  //     false,
  //     erpStoreCode
  //   );
  //   let token = await this.retailAdapter.generateToken(headerWithOutToken);
  //   let headerWithToken = await this.headerForIretail(
  //     MERCHANT_CODE,
  //     currentDate,
  //     false,
  //     false,
  //     token,
  //     erpStoreCode
  //   );
  // }
  async headerForIretail(
    merchantcode: any,
    starttime: any,
    batchnumber: any,
    batchsize: any,
    auth: any,
    erpStoreCode: any
  ) {
    let headers: any = {};
    if (auth) {
      headers.Authorization = "Bearer " + auth;
    }
    if (merchantcode) {
      headers.merchantcode = merchantcode;
    }
    if (batchnumber || batchnumber === 0) {
      headers.batchnumber = batchnumber;
    }
    if (batchsize) {
      headers.batchSize = batchsize;
    }
    if (starttime) {
      headers.starttime = starttime;
    }
    if (erpStoreCode) {
      headers[constants.STORE_ERP_CODE] = erpStoreCode;
    }
    return headers;
  }
  async TokenGenerationAndGetProducts(
    MERCHANT_CODE: any,
    currentDate: any,
    batchnumber: number,
    batchsize: number,
    erpStoreCode: any,
    type: any
  ): Promise<any> {
    let headerWithOutToken = await this.headerForIretail(
      MERCHANT_CODE,
      currentDate,
      batchnumber,
      batchsize,
      false,
      erpStoreCode
    );
    // let token: any = await this.retailAdapter.generateToken(headerWithOutToken);
    let headerWithToken = await this.headerForIretail(
      MERCHANT_CODE,
      currentDate,
      batchnumber,
      batchsize,
      "da47dfd07bd8c621b8015d01377f07a0e6db4551999da984da7e3d526f6a876c",
      erpStoreCode
    );
    return this.getProductListByType(type, headerWithToken);
  }
  async getProductListByType(type: any, token: any): Promise<any> {
    let productList;
    if (type === constants.BARCODE_TYPE) {
      productList = await this.retailAdapter.getBarCodeProducts(token);
    } else if (type === constants.STOCK_STATUS_TYPE) {
      productList = await this.retailAdapter.getStockStatus(token);
    } else if (type === constants.PRODUCT_PRICE_TYPE) {
      productList = await this.retailAdapter.ProductPriceSync(token);
    }
    if (productList) {
      return productList;
    } else {
      return {};
    }
  }
}
