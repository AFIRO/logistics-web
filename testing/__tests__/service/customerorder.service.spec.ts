import { CustomerOrderRepository } from "../../../backend/repository/customerorder.repository";
import { PersonRepository } from "../../../backend/repository/person.repository";
import { CustomerOrderService } from "../../../backend/service/customerorder.service";
import { TestData } from "../../test.data"

const customerOrderService = new CustomerOrderService();
const mockCustomerOrderRepository = new CustomerOrderRepository()
const mockPersonRepository = new PersonRepository()
customerOrderService.customerOrderRepository = mockCustomerOrderRepository;
customerOrderService.personRepository = mockPersonRepository;

describe('customer order service tests', () => {
  it('get by id gets customer order correctly', async () => {
    mockCustomerOrderRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_CUSTOMER_ORDER);
    const actual = await customerOrderService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_CUSTOMER_ORDER)
    expect(mockCustomerOrderRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id, none found, throws', async () => {
    mockCustomerOrderRepository.findById = jest.fn().mockResolvedValue(null);
    expect(customerOrderService.findById(TestData.ID)).rejects.toThrow();
    expect(mockCustomerOrderRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by track and trace, gets customer order correctly', async () => {
    mockCustomerOrderRepository.findByTrackAndTrace = jest.fn().mockResolvedValue(TestData.TEST_CUSTOMER_ORDER);
    const actual = await customerOrderService.findByTrackAndTrace(TestData.ID,TestData.ID);

    expect(actual).toEqual(TestData.TEST_CUSTOMER_ORDER)
    expect(mockCustomerOrderRepository.findByTrackAndTrace).toHaveBeenCalledWith(TestData.ID, TestData.ID)
  })

  it('get by track and trace,, none found, throws', async () => {
    mockCustomerOrderRepository.findByTrackAndTrace = jest.fn().mockResolvedValue(null);
    expect(customerOrderService.findByTrackAndTrace(TestData.ID,TestData.ID)).rejects.toThrow();
    expect(mockCustomerOrderRepository.findByTrackAndTrace).toHaveBeenCalledWith(TestData.ID, TestData.ID)
  })


  it('get by customer id, person found, returns correctly', async () => {
    mockPersonRepository.existsById = jest.fn().mockResolvedValue(true)
    mockCustomerOrderRepository.getAllFromCustomer = jest.fn().mockResolvedValue([TestData.TEST_CUSTOMER_ORDER]);
    const actual = await customerOrderService.findAllByCustomer(TestData.ID);
    expect(actual).toEqual([TestData.TEST_CUSTOMER_ORDER])
    expect(mockCustomerOrderRepository.getAllFromCustomer).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by customer id, person not found found, throws', async () => {
    mockPersonRepository.existsById = jest.fn().mockResolvedValue(false)
    expect(customerOrderService.findAllByCustomer(TestData.ID)).rejects.toThrow();
  })

  it('get by customer id, person found but no orders, returns correctly', async () => {
    mockPersonRepository.existsById = jest.fn().mockResolvedValue(true)
    mockCustomerOrderRepository.getAllFromCustomer = jest.fn().mockResolvedValue([]);
    const actual = await customerOrderService.findAllByCustomer(TestData.ID);
    expect(actual).toEqual([])
    expect(mockCustomerOrderRepository.getAllFromCustomer).toHaveBeenCalledWith(TestData.ID)
  })
}
)