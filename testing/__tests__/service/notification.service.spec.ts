import { NotificationRepository } from "../../../backend/repository/notification.repository";
import { NotificationService } from "../../../backend/service/notification.service";
import { TestData } from "../../test.data"

const notificationService = new NotificationService();
const mockRepository = new NotificationRepository()
notificationService.notificationRepository = mockRepository;

describe('notification service tests', () => {
  it('get by id gets notification correctly', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_NOTIFICATION);
    const actual = await notificationService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_NOTIFICATION)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id, none found, throws', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);
    expect(notificationService.findById(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })
}
)