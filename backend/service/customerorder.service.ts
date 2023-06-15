import { customer_order } from "../../db/prisma";
import { Logger } from "../../app/util/logger";
import { CustomerOrderRepository } from "../repository/customerorder.repository";
import { PersonRepository } from "../repository/person.repository";
import { AdressDto } from "../dto/adres.dto";
import { ValidatorOptions } from "class-validator";
import { UserRepository } from "../repository/user.repository";
import { PackagingRepository } from "../repository/packaging.repository";
import { ProductRepository } from "../repository/product.repository";
import { AddressService } from "./address.service";

export class CustomerOrderService {
  private readonly validatorOptions: ValidatorOptions =
    {
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validationError: {
        target: false
      }
    }
    
  private logger: Logger;
  public customerOrderRepository: CustomerOrderRepository;
  public personRepository: PersonRepository
  public userRepository: UserRepository;
  public packagingRepository: PackagingRepository;
  public productRepository: ProductRepository;
  public addressService: AddressService;

  public constructor() {
    this.logger = new Logger();
    this.customerOrderRepository = new CustomerOrderRepository;
    this.personRepository = new PersonRepository;
    this.addressService = new AddressService;
    this.productRepository = new ProductRepository;
}

public async findById(id: string): Promise<customer_order> {
  this.logger.info(`CustomerOrderService getting order with id ${id}.`)
  const potentialOrder = await this.customerOrderRepository.findById(id)
  if (potentialOrder) {
      return potentialOrder;
  } else {
      this.logger.error(`Order with id ${id} not found in repository.`);
      throw Error(`Order with id ${id} not found`)
  }
}

public async findByTrackAndTrace(trackAndTrace: string, extraValidation:string): Promise<customer_order> {
  this.logger.info(`CustomerOrderService Getting customer order with T&T ${trackAndTrace} and extra validation ${extraValidation}.`)
  const potentialOrder = await this.customerOrderRepository.findByTrackAndTrace(trackAndTrace,extraValidation)
  if (potentialOrder) {
      return potentialOrder;
  } else {
      this.logger.error(`Order with T&T ${trackAndTrace} and extra validation ${extraValidation} not found in repository.`);
      throw Error(`Order with T&T ${trackAndTrace} and extra validation ${extraValidation} not found`)
  }
}

public async findAllByCustomer(personId:string): Promise<customer_order[]>{
  if (await this.personRepository.existsById(personId)){
    return await this.customerOrderRepository.getAllFromCustomer(personId)
  } else {
    this.logger.error(`Person with Id ${personId}.`);
    throw Error(`Person with Id ${personId}`)
  }
}

public async createOrder(userId: string, adres: AdressDto, packagingId: string, products: Map<string,number>, customerId:string){
  
  //await validate(adres,this.validatorOptions)
  //this.validateExistenceOfPassedUserAndPackaging(userId, packagingId)
  //this.validateExistenceOfAllProductsInOrder(products)

  const address = await this.addressService.createAddress(adres);
  const order = await this.customerOrderRepository.createOrder(userId, packagingId, address.address_id, customerId);

  for (const [key, value] of products) {
    const product = await this.productRepository.findById(key);
    await this.customerOrderRepository.createOrderline(product, value, order.order_id);
  }

  return order;
}

private async validateExistenceOfPassedUserAndPackaging(userId:string, packagingId:string){
  if(!await this.packagingRepository.existsById(packagingId)){
    throw Error(`Packaging with id ${packagingId} not found in database`)
  }

  if(!await this.userRepository.existsById(userId)){
    throw Error(`User with id ${userId} not found in database`)
  }
}

private async validateExistenceOfAllProductsInOrder(products:Map<string,number>) {
  Array.from(products.keys())
  .forEach(async productId => {
    if(!await this.productRepository.existsById(productId)){
      throw Error(`Product with id ${productId} not found in database`)
    }
  })
}

public async findOrderLinesByOrderId(orderId:string){
  this.logger.info(`CustomerOrderService getting orderlines with order id ${orderId}.`);
  const potentialOrderLines = await this.customerOrderRepository.getAllOrderlinesFromOrder(orderId);
  return potentialOrderLines
}

}