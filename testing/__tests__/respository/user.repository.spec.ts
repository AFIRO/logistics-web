import { prisma } from "../../../db/prisma";
import { TestData } from "../../test.data"
import { UserRepository } from "../../../backend/repository/user.repository";

const userRepository = new UserRepository();

describe('user repository tests', () => {
  it('get all to return objects correctly', async () => {
    prisma.application_user.findMany = jest.fn().mockResolvedValue([TestData.TEST_USER])
    expect(await userRepository.findAll()).toEqual(expect.arrayContaining([TestData.TEST_USER]))
    expect(prisma.application_user.findMany).toHaveBeenCalled()
  })

  it('get by id to return object correctly', async () => {
    prisma.application_user.findUnique = jest.fn().mockResolvedValue(TestData.TEST_USER);
    expect(await userRepository.findById(TestData.ID)).toEqual(TestData.TEST_USER)
    expect(prisma.application_user.findUnique).toHaveBeenCalled()
  })

  it('exists by id, entity exists, returns true', async () => {
    prisma.application_user.count = jest.fn().mockResolvedValue(1);
    expect(await userRepository.existsById(TestData.ID)).toEqual(true)
    expect(prisma.application_user.count).toHaveBeenCalled()
  })

  it('exists by id, entity does not exist, returns false', async () => {
    prisma.application_user.count = jest.fn().mockResolvedValue(0);
    expect(await userRepository.existsById(TestData.ID)).toEqual(false)
    expect(prisma.application_user.count).toHaveBeenCalled()
  })


it('get by id with notifications to return object correctly', async () => {
  prisma.application_user.findUnique = jest.fn().mockResolvedValue(TestData.TEST_USER_WITH_NOTIFICATIONS);
  expect(await userRepository.findByIdWithNotifications(TestData.ID)).toEqual(TestData.TEST_USER_WITH_NOTIFICATIONS)
  expect(prisma.application_user.findUnique).toHaveBeenCalled()
  })


it('get by id with notifications user not found returns null', async () => {
  prisma.application_user.findUnique = jest.fn().mockResolvedValue(null);
  expect(await userRepository.findByIdWithNotifications(TestData.ID)).toEqual(null)
  expect(prisma.application_user.findUnique).toHaveBeenCalled()
  })
}

)
  