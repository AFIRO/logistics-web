import { prisma, packaging } from "../../db/prisma";
import { Logger } from "../../app/util/logger";

export class PackagingRepository{
  private logger: Logger;

  public constructor(){
    this.logger = new Logger();
  }

  public async getAll(): Promise<packaging[]>{
    this.logger.info(`Getting all packagings from database.`)
    return await prisma.packaging.findMany();
  }

  public async existsById(id:string){
    this.logger.info(`Checking if packaging with id ${id} exists in database.`)
    return 0 != await prisma.packaging.count({where: {packaging_id:id}})
  }
}