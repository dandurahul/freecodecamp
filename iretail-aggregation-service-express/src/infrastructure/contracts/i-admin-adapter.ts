export interface IAdminAdapter {
  getGlobalSettings(): Promise<any>;
  getAllCurrenciesByID(): Promise<any>;
}
