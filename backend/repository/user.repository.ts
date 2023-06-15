//import { PrismaClient, application_user, notification } from "@prisma/client";

import { prisma, address, application_user } from "../../db/prisma";
import { Logger } from "../../app/util/logger";

type user_person_address = {
    user_id: string,
    email: string | null,
    password: string | null,
    role: string | null,
    persoonsgegevens_person_id: string | null,
    person: person_with_address | null
}

type person_with_address = {
  person_id: string,
  email: string | null,
  first_name: string | null,
  last_name: string | null,
  phone_number : string | null,
  address_gegevens_id: string | null,
  address: address
}

export class UserRepository {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger();
  }

  public async findAll(): Promise<application_user[]> {
    this.logger.info("Getting all users from repository.");
    return await prisma.application_user.findMany();
  }

  public async findById(id:string): Promise<application_user>{
      return await prisma.application_user.findUnique({where:{ user_id : id}, include:{person:true }})
  }

  public async findBydIDWithPersonAddress(id:string): Promise<user_person_address>{
    const user = await prisma.application_user.findUnique({where: { user_id : id}})
    const person = await prisma.person.findUnique({where: { person_id : user.persoonsgegevens_person_id}})
    const address = await prisma.address.findUnique({where: { address_id : person.address_address_id}})

    const new_person : person_with_address = {
      person_id : person.person_id,
      email: person.email,
      first_name: person.first_name,
      last_name: person.last_name,
      phone_number: person.phone_number,
      address_gegevens_id: person.address_address_id,
      address: address
    }

    const new_user : user_person_address = {
      user_id : user.user_id,
      email: user.email,
      password: user.password,
      role: user.role,
      persoonsgegevens_person_id: user.persoonsgegevens_person_id,
      person: new_person
    }
    
    return new_user
  }

  public async existsById(id:string){
    this.logger.info(`Checking if user with id ${id} exists in database.`)
    return 0 != await prisma.application_user.count({where: {user_id:id}})
  }

  public async findByIdWithNotifications(id: string): Promise<application_user> {
    this.logger.info(`Getting user with id ${id} with notifications from repository.`);
    return await prisma.application_user.findUnique({
      where: {
        user_id: id,
      },
      include:{
        application_user_notifications:{
        include: {
          notification:true
        }
      }, 
      person:true
    }
    });
  }
}
