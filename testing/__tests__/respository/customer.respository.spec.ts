import { prisma } from "../../../db/prisma";
import { TestData } from "../../test.data"
import { CustomerRepository } from "../../../backend/repository/customer.repository";

const customerRepository = new CustomerRepository();

describe('customer repository tests', () => {
  it('get customer by purchaser id to return objects correctly', async () => {
    prisma.customer.findFirst = jest.fn().mockResolvedValue([TestData.TEST_CUSTOMER]);
    expect(await customerRepository.getCustomerByPurchaserId(TestData.ID)).toEqual([TestData.TEST_CUSTOMER])
    expect(prisma.customer.findFirst).toHaveBeenCalled()
  })
}
)