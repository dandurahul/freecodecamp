import { Container } from "inversify";
import { ContainerTypes } from "./container-types";
import { IRepositoryBase } from "../../infrastructure/repositories/contracts/base/i-repository-base";


const container = new Container();

container
  .bind<IusersProviderController>(ContainerTypes.usersProviderController)
  .to(usersProviderController)
container
  .bind<IusersProviderService>(ContainerTypes.usersProviderService)
  .to(usersProviderService)

export { container }