import { prisma, address } from "../../db/prisma";
import { Logger } from "../../app/util/logger";
import { AdressDto } from "../dto/adres.dto";

export class AddressRepository {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger();
  }

  public async findById(id:string): Promise<address>{
    this.logger.info(`Getting address with id: ${id}`)
    return await prisma.address.findUnique({where:{ address_id : id}})
  }

  public async createAddress(address: AdressDto): Promise<address> {
    this.logger.info(`Creating address`)
    return await prisma.address.create({
      data: {
        street: address.straat,
        house_number: address.nummer,
        postal_code: address.postcode,
        country: address.land,
      }
    })
  }

  public async updateAddress(addressId: string, address: AdressDto) {
    this.logger.info(`Updating address with id: ${addressId}`)
    return await prisma.address.update({
      where: { address_id: addressId },
      data: {
        street: address.straat,
        house_number: address.nummer,
        postal_code: address.postcode,
        country: address.land,
      }
    })
  }

}
