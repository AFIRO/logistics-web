import { prisma } from "../../../db/prisma";
import { TestData } from "../../test.data"
import { PackagingRepository } from "../../../backend/repository/packaging.repository";

const packagingRepository = new PackagingRepository();

describe('packaging repository tests', () => {
  it('get all returns objects correctly', async () => {
    prisma.packaging.findMany = jest.fn().mockResolvedValue([TestData.TEST_PACKAGING]);
    expect(await packagingRepository.getAll()).toEqual([TestData.TEST_PACKAGING])
    expect(prisma.packaging.findMany).toHaveBeenCalled()
  })

  it('exists by id, does not exist, returns boolean correctly', async () => {
    prisma.packaging.count = jest.fn().mockResolvedValue(0);
    expect(await packagingRepository.existsById(TestData.ID)).toEqual(false)
    expect(prisma.packaging.count).toHaveBeenCalled()
  })

  it('exists by id, exists, returns boolean correctly', async () => {
    prisma.packaging.count = jest.fn().mockResolvedValue(1);
    expect(await packagingRepository.existsById(TestData.ID)).toEqual(true)
    expect(prisma.packaging.count).toHaveBeenCalled()
  })
}
)