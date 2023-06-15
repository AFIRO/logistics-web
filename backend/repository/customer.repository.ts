import { prisma, customer } from "../../db/prisma";
import { Logger } from "../../app/util/logger";

export class CustomerRepository{
  private logger: Logger;

  public constructor(){
    this.logger = new Logger();
  }

  public async getCustomerByPurchaserId(id:string): Promise<customer>{
    this.logger.info(`Getting customer by purchaserId ${id}`)
    return await prisma.customer.findFirst({
      where:{ 
        customer_buyers: {
        some: {
          customer_customer_id: id
        } 
        
      }},
      include:{
        customer_order:{
          include: {
            customer_order_order_lines: true}
          }
        },
      })
  } 
}