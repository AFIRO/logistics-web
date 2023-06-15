import { packaging } from "../../db/prisma";
import { Logger } from "../../app/util/logger";
import { PackagingRepository } from "../repository/packaging.repository";

export class PackagingService {
  private logger: Logger;
  public packagingRepository: PackagingRepository;

  public constructor() {
    this.logger = new Logger();
    this.packagingRepository = new PackagingRepository;
}

public async findAll(): Promise<packaging[]> {
  this.logger.info(`PackagingService getting all packages.`)
  const data = await this.packagingRepository.getAll();
  if (data.length != 0) {
      return data;
  }
  else {
      this.logger.error(`No packages in database`)
      throw Error(`No packages in database`)
  }
}
}