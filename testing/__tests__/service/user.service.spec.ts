import { UserRepository } from "../../../backend/repository/user.repository";
import { UserService } from "../../../backend/service/user.service";
import { TestData } from "../../test.data"

const userService = new UserService();
const mockRepository = new UserRepository()
userService.userRepository = mockRepository;

describe('user service tests', () => {
  it('get all gets all users correctly', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_USER]);
    const actual = await userService.findAll();

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_USER])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get all, none found, throws', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([]);

    expect(userService.findAll()).rejects.toThrow();
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id gets user correctly', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_USER);
    const actual = await userService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id, none found, throws', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);

    expect(userService.findById(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID);
  })

  it('get by id with notifications gets user correctly', async () => {
    mockRepository.findByIdWithNotifications = jest.fn().mockResolvedValue(TestData.TEST_USER_WITH_NOTIFICATIONS);
    const actual = await userService.findByIdWithNotifications(TestData.ID);

    expect(actual).toEqual(TestData.TEST_USER_WITH_NOTIFICATIONS)
    expect(mockRepository.findByIdWithNotifications).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id with notifications, no user found, throws', async () => {
    mockRepository.findByIdWithNotifications = jest.fn().mockResolvedValue(null);

    expect(userService.findByIdWithNotifications(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findByIdWithNotifications).toHaveBeenCalledWith(TestData.ID);
  })
}
)