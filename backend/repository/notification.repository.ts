import { prisma, notification } from "../../db/prisma";
import { Logger } from "../../app/util/logger";

export class NotificationRepository{
  private logger: Logger;

  public constructor(){
    this.logger = new Logger();
  }

  public async findById(id:string): Promise<notification>{
    this.logger.info(`Getting notification with id ${id} from database.`)
    return await prisma.notification.findUnique({
      where: {
        id: id,
      },
    })
  } 
  public async findAllByUserId(id:string){
    this.logger.info(`Getting all notification for user with id ${id} from database.`)
    return await prisma.notification.findMany({
      where: {
        id: id,
      },
    })
  } 

}