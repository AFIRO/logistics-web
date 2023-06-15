
import { PackagingRepository } from "../../../backend/repository/packaging.repository";
import { PackagingService } from "../../../backend/service/packaging.service";
import { TestData } from "../../test.data"

const packagingService = new PackagingService();
const mockRepository = new PackagingRepository()
packagingService.packagingRepository = mockRepository;

describe('packaging service tests', () => {
  it('get all gets packages correctly', async () => {
    mockRepository.getAll = jest.fn().mockResolvedValue([TestData.TEST_NOTIFICATION]);
    const actual = await packagingService.findAll();

    expect(actual).toEqual([TestData.TEST_NOTIFICATION])
    expect(mockRepository.getAll).toHaveBeenCalled()
  })

  it('get by id, none found, throws', async () => {
    mockRepository.getAll = jest.fn().mockResolvedValue([]);
    expect(packagingService.findAll()).rejects.toThrow();
    expect(mockRepository.getAll).toHaveBeenCalled()
  })
}
)