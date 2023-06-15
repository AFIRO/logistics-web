import { UserRepository } from "../repository/user.repository";
import { Logger } from "../../app/util/logger";
import { address, application_user } from "../../db/prisma";

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


export class UserService {
  private logger: Logger;
  public userRepository: UserRepository

  public constructor() {
    this.logger = new Logger();
    this.userRepository = new UserRepository();
  }

  public async findAll(): Promise<application_user[]> {
    this.logger.info(`UserService getting all users.`)
    const data = await this.userRepository.findAll();
    if (data.length != 0) {
      return data;
    }
    else
      throw Error(`No users in database`)
  }

  public async findById(id: string): Promise<application_user> {
    this.logger.info(`UserService getting user with id ${id}.`)
    const user = await this.userRepository.findById(id)
    if (!user) {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw Error(`User with id ${id} not found`)
    }
    return user;
  }

  public async findBydIDWithPersonAddress(id:string): Promise<user_person_address>{
    this.logger.info(`UserService getting user with id ${id} with person details and address.`)
    const user = await this.userRepository.findBydIDWithPersonAddress(id)
    if (!user) {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw Error(`User with id ${id} not found`)
    }
    return user;
  }

  public async findByIdWithNotifications(id: string): Promise<application_user> {
    this.logger.info(`UserService getting user with id ${id} with notifications.`)
    const user = await this.userRepository.findByIdWithNotifications(id)
    if (!user) {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw Error(`User with id ${id} not found`)
    }
    return user;
  }
}