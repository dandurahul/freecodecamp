export const ContainerTypes = {
    // Payment
    PaymentController: Symbol.for("PaymentController"),
    PaymentService: Symbol.for("PaymentService"),
    PaymentRepository: Symbol.for("PaymentRepository"),
    PaymentRepositoryBase: Symbol.for("PaymentRepositoryBase"),
  
    //TemporaryTransactions
    TemporaryTransactionsController: Symbol.for(
      "TemporaryTransactionsController"
    ),
    TemporaryTransactionsService: Symbol.for("TemporaryTransactionsService"),
    TemporaryTransactionsRepository: Symbol.for(
      "TemporaryTransactionsRepository"
    ),
    TemporaryTransactionsRepositoryBase: Symbol.for(
      "TemporaryTransactionsRepositoryBase"
    ),
  
    //order
    PaymentProviderOrderService: Symbol.for("PaymentProviderOrderService"),
    PaymentProviderOrderController: Symbol.for("PaymentProviderOrderController"),
  
    //users Provider
    usersProviderController: Symbol.for("usersProviderController"),
    usersProviderService: Symbol.for("usersProviderService"),
  };
  