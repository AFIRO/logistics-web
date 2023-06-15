import { prisma, customer_order } from "../../db/prisma";
import { Logger } from "../../app/util/logger";

export class TrackAndTraceRepository{
  private logger: Logger;

  public constructor(){
    this.logger = new Logger();
  }

  public async getOrderByTrackAndTrace(id:string): Promise<customer_order>{
    this.logger.info(`Getting customer order by Track-and-trace number: ${id}`)
    return await prisma.customer_order.findFirst({
      where:{ 
        track_trace_code: id,
      }},
      )
  } 
}