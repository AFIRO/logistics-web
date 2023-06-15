import { prisma } from "../../../db/prisma";
import { TestData } from "../../test.data"
import { CustomerOrderRepository } from "../../../backend/repository/customerorder.repository";

const customerOrderRepository = new CustomerOrderRepository();

describe('customer order repository tests', () => {
  it('get all by customer id to return objects correctly', async () => {
    prisma.customer_order.findMany = jest.fn().mockResolvedValue([TestData.TEST_CUSTOMER_ORDER]);
    expect(await customerOrderRepository.getAllFromCustomer(TestData.ID)).toEqual([TestData.TEST_CUSTOMER_ORDER])
    expect(prisma.customer_order.findMany).toHaveBeenCalled()
  })

  it('get by id to return object correctly', async () => {
    prisma.customer_order.findUnique = jest.fn().mockResolvedValue(TestData.TEST_CUSTOMER_ORDER);
    expect(await customerOrderRepository.findById(TestData.ID)).toEqual(TestData.TEST_CUSTOMER_ORDER)
    expect(prisma.customer_order.findUnique).toHaveBeenCalled()
  })

  it('get by track and trace id to return object correctly', async () => {
    prisma.customer_order.findFirst = jest.fn().mockResolvedValue(TestData.TEST_CUSTOMER_ORDER);
    expect(await customerOrderRepository.findByTrackAndTrace(TestData.ID, TestData.ID)).toEqual(TestData.TEST_CUSTOMER_ORDER)
    expect(prisma.customer_order.findFirst).toHaveBeenCalled()
  })
}
)