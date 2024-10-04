export const buildCategoriesForSearch = (
  categories: any[],
  subCategories: any[],
  classifications: any[],
  fullCategories: any[],
  fullSubCategories: any[],
  fullClassifications: any[]
) => {
  let serialNo = 0;
  const result: any = [];

  const checkIfCategorizationExist = (text: string) => {
    return result.find((e: any) => e.text == text)
  }

  const processItems = (
    items: any[],
    type: string,
    result: any[]
  ) => {
    items?.forEach((item) => {
      if (type === 'category') {
        processCategory(item, fullSubCategories, fullClassifications, result);
      } else if (type === 'subCategory') {
        processSubCategories([item], fullCategories, fullClassifications, result);
      } else if (type === 'classification') {
        processClassifications([item], fullCategories, fullSubCategories, result);
      }
    });
  };

  const processClassifications = (
    classifications: any[],
    fullCategories: any[],
    fullSubCategories: any[],
    result: any[]
  ) => {
    classifications?.forEach(async (classification) => {
      const categoryDetails = fullCategories.find((item) => item.id == classification.categoryId);
      const subCategory = fullSubCategories.find((item) => item.id == classification.subCategoryId);

      if (categoryDetails && subCategory) {
        const text = `${categoryDetails.categoryName} >> ${subCategory.subCategoryName} >> ${classification.classificationName}`;
        !checkIfCategorizationExist(text) &&
          result.push(buildcategorySearchResponse(++serialNo, classification.categoryId, classification.subCategoryId, classification.id, text));
      }
    });
  };

  const processSubCategories = (
    subCategories: any[],
    fullCategories: any[],
    fullClassifications: any[],
    result: any[]
  ) => {
    subCategories?.forEach((subCategory) => {
      const category = fullCategories.find((item) => item.id == subCategory.categoryId?._id);
      let text = `${category?.categoryName} >> ${subCategory?.subCategoryName}`
      if (!subCategory.productAllowed && category) {
        let filteredClassification = fullClassifications.filter((item) => item.subCategoryId == subCategory.id)
        filteredClassification?.length ?
          processClassifications(fullClassifications.filter((item) => item.subCategoryId == subCategory.id), fullCategories, fullSubCategories, result)
          : !checkIfCategorizationExist(text) && result.push(buildcategorySearchResponse(++serialNo, subCategory.categoryId._id, subCategory.id, undefined, text));
      } else if (category) {
        !checkIfCategorizationExist(text) &&
          result.push(buildcategorySearchResponse(++serialNo, subCategory.categoryId._id, subCategory.id, undefined, text));
      }
    });
  };

  const processCategory = (
    category: any,
    fullSubCategories: any[],
    fullClassifications: any[],
    result: any[]
  ) => {
    if (!category.productAllowed) {
      const subcategories = fullSubCategories.filter((item) => item.categoryId == category.id);
      if (subcategories.length)
        processSubCategories(subcategories, fullCategories, fullClassifications, result);
      else
        !checkIfCategorizationExist(category.categoryName) && result.push(buildcategorySearchResponse(++serialNo, category.id, undefined, undefined, category.categoryName));
    } else {
      !checkIfCategorizationExist(category.categoryName) && result.push(buildcategorySearchResponse(++serialNo, category.id, undefined, undefined, category.categoryName));
    }
  };

  const allItems = [
    { type: 'category', items: categories },
    { type: 'subCategory', items: subCategories },
    { type: 'classification', items: classifications },
  ];
  allItems.forEach((itemType) => processItems(itemType.items, itemType.type, result));
  return result;
};


const buildcategorySearchResponse = (
  serialNo: number,
  categoryId: string | undefined,
  subCategoryId: string | undefined,
  classificationId: string | undefined,
  text: string
) => ({
  serialNo,
  categoryId,
  subCategoryId,
  classificationId,
  text,
});



