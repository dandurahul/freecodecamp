export default class ErrorConstants {
  public static readonly DUPLICATE_HTTP_ERROR = 409;
  public static readonly UNAUTHORISED_HTTP_ERROR = 401;
  public static readonly REQUEST_HTTP_ERROR = 401;
  public static readonly UNAUTHORISED_HTTP_USER = 403;
  public static readonly NOT_FOUND_ERROR = "not found";
  public static readonly NOT_FOUND = 404;
  public static readonly BAD_REQUEST = 400;
  public static readonly INTERNAL_SERVER_ERROR = 500;
  public static readonly UNAUTHORISED_HTTP_ERROR_CODE = "SHOP-001";
  public static readonly INTERNAL_SERVER_ERROR_CODE = "SHOP-500";
  public static readonly INVALID_REQUEST = "Please provide proper request body";
  public static readonly ITEM_NOT_FOUND = "Item not found";

  public static readonly ERROR_CONSTANT = "SHOPCS-";
  public static readonly CONFLICT_ERROR_CODE = 409;

  public static readonly INVALID_REQUEST_CODE =
    ErrorConstants.ERROR_CONSTANT + "001";
  public static readonly INVALID_REQUEST_MESSAGE =
    "Please provide proper request body";

  public static readonly SHOPPING_CART_NOT_FOUND_REQUEST_CODE =
    ErrorConstants.ERROR_CONSTANT + "002";
  public static readonly INTERNAL_SERVER_ERROR_MESSAGE =
    "Internal server error";
  public static readonly USER_NOT_CREATED =
    "User not created, please try again.";
  public static readonly DELETE_SUCCESS_MESSAGE = "deleted successfully";

}
