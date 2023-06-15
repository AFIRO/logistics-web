import { prisma } from "../../db/prisma";
import { Logger } from "../../app/util/logger";


export class PersonRepository{
  private logger: Logger;

  public constructor(){
    this.logger = new Logger();
  }

  public async existsById(id:string){
    this.logger.info(`Checking if person with id ${id} exists in database.`)
    return 0 != await prisma.person.count({where: {person_id:id}})
  }
}