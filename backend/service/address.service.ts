import { Logger } from "../../app/util/logger";
import { address } from "../../db/prisma";
import { AddressRepository } from "../repository/address.repository";
import { AdressDto } from "../dto/adres.dto";

export class AddressService {
  private logger: Logger;
  public addressRepository: AddressRepository

  public constructor() {
    this.logger = new Logger();
    this.addressRepository = new AddressRepository();
  }

  public async findById(id: string): Promise<address> {
    this.logger.info(`AddressService getting address with id ${id}.`)
    const address = await this.addressRepository.findById(id)
    if (!address) {
      this.logger.error(`Address with id ${id} not found in repository.`);
      throw Error(`Address with id ${id} not found`)
    }
    return address;
  }

  public async createAddress(address: AdressDto): Promise<address> {
    this.logger.info(`AddressService creating address`);
    return await this.addressRepository.createAddress(address);
  }

  public async updateAddress(addressId: string, address: AdressDto) {
    this.logger.info(`AddressService updating address with id ${addressId}`);
    return await this.addressRepository.updateAddress(addressId, address);
  }

}