import { constants } from "../constants/constants.constants";

export async function aggregateBarcodeData(globalProductList, newProductData) {
  let storeProductData =
    globalProductList &&
    globalProductList.map((product:any) => {
      let itemCode = product && product.itemCode;
      let iretailMaster =
        newProductData &&
        newProductData.filter(
          (stock:any) => stock[constants.PRODUCT_CODE_FOR_BARCODE] === itemCode
        );
      let barcodes =
        iretailMaster &&
        iretailMaster.map((b:any) => b[constants.BARCODE_PROPERTY]);
      //iretail data
      let variantData = {
        productVariantIndex: product.productVariantIndex,
        barcodes: barcodes,
      };
      delete product.productVariantIndex;
      if (variantData) {
        return {
          ...product,
          variant: variantData,
          type: constants.BARCODE_UPDATE,
        };
      }
    });
  // return  CommonUtils.removeUndefinedInArray(storeProductData);
}

