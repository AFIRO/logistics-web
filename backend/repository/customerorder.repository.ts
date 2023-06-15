import { prisma, customer_order, customer_order_order_lines, product } from "../../db/prisma";
import { Logger } from "../../app/util/logger";

export class CustomerOrderRepository{
  private logger: Logger;

  public constructor(){
    this.logger = new Logger();
  }

  public async getAllFromCustomer(customerId:string): Promise<customer_order[]>{
    this.logger.info(`Getting all customer order with for customer with id ${customerId} from database.`)
    return await prisma.customer_order.findMany({
      where: {
        purchaser_person_id: customerId
      }
    })
  }

  public async findById(id:string): Promise<customer_order>{
    this.logger.info(`Getting customer order with id ${id} from database.`)
    return prisma.customer_order.findUnique({
      where: {
        order_id: id,
      },
      include: {
        packaging: true,
      }
    })
  }
  
  public async findByTrackAndTrace(trackAndTrace:string, extraValidation:string): Promise<customer_order>{
    this.logger.info(`Getting customer order with T&T ${trackAndTrace} and extra validation ${extraValidation} from database.`)
    return prisma.customer_order.findFirst({
      where: {
       track_trace_code : trackAndTrace,
       extra_validation_code: extraValidation
      },
    })
  }

  public async getAllOrderlinesFromOrder(orderId:string): Promise<customer_order_order_lines[]>{
    this.logger.info(`Getting all orderlines with order id ${orderId} from database.`)
    return await prisma.customer_order_order_lines.findMany({
      where: {
        customer_order_order_id: orderId
      },
      include: {
        order_line: {
          include: {
            product: true,
          }
        }
      }
    })
  }

  public async createOrder(personId: string, packagingId: string, addressId: string, customerId: string): Promise<customer_order> {
    this.logger.info("Creating customer order from repository.");
    return await prisma.customer_order.create({
      data: {
        order_date: new Date(),
        status: "OPEN",
        purchaser_person_id: personId,
        //purchaser_person_id: "14c8c162-d31c-454b-b1ea-f5579de67849",
        packaging_packaging_id: packagingId,
        delivery_address_address_id: addressId,
        customer_customer_id: customerId,
      },
    })
  }

  public async createOrderline(product : product, amount, orderId: string){
    this.logger.info("Creating customer orderline from repository.");
    const orderline = await prisma.order_line.create({
      data: {
        quantity_ordered: amount,
        unit_price_order_line: product.unit_price,
        product_product_id: product.product_id
      },
    })
    return await prisma.customer_order_order_lines.create({
      data: {
        order_lines_line_id: orderline.line_id,
        customer_order_order_id: orderId,
      }
    })
  }

  public async updateBoxOrder(orderId: string, boxId: string){
    this.logger.info("Updating customer order from repository.");
    return await prisma.customer_order.update({
      where: {
        order_id: orderId,
      },
      data: {
        packaging_packaging_id: boxId,
      },
    })
  }

}