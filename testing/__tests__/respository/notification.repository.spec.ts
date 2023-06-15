import { prisma } from "../../../db/prisma";
import { TestData } from "../../test.data"
import { NotificationRepository } from "../../../backend/repository/notification.repository";

const notificationRespository = new NotificationRepository();

describe('notifcation repository tests', () => {
  it('get by id to return object correctly', async () => {
    prisma.notification.findUnique = jest.fn().mockResolvedValue(TestData.TEST_NOTIFICATION);
    expect(await notificationRespository.findById(TestData.ID)).toEqual(TestData.TEST_NOTIFICATION)
    expect(prisma.notification.findUnique).toHaveBeenCalled()
  })
}
)