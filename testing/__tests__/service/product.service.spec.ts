import { ProductRepository } from "../../../backend/repository/product.repository";
import { ProductService } from "../../../backend/service/product.service";
import { TestData } from "../../test.data"

const productService = new ProductService();
const mockRepository = new ProductRepository()
productService.productRepository = mockRepository;

describe('product service tests', () => {
  it('get all gets all products correctly', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT]);
    const actual = await productService.findAll();

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_PRODUCT])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get all, none found, throws', async () => {
    mockRepository.findAll = jest.fn().mockResolvedValue([]);

    expect(productService.findAll()).rejects.toThrow();
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get by id gets product correctly', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(TestData.TEST_PRODUCT);
    const actual = await productService.findById(TestData.ID);

    expect(actual).toEqual(TestData.TEST_PRODUCT)
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID)
  })

  it('get by id, none found, throws', async () => {
    mockRepository.findById = jest.fn().mockResolvedValue(null);

    expect(productService.findById(TestData.ID)).rejects.toThrow();
    expect(mockRepository.findById).toHaveBeenCalledWith(TestData.ID);
  })

  it('get all sorted, gets all products correctly', async () => {
    mockRepository.findAllSorted = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]);
    const actual = await productService.findAllSorted("name","asc");

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get all sorted UPPERCASE, gets all products correctly', async () => {
    mockRepository.findAllSorted = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]);
    const actual = await productService.findAllSorted("NAME","ASC");

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])))
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get all sorted, none found, throws', async () => {
    mockRepository.findAllSorted = jest.fn().mockResolvedValue([]);

    expect(productService.findAllSorted("name","asc")).rejects.toThrow();
    expect(mockRepository.findAll).toBeCalled()
  })

  it('get all sorted, wrong sortOrder, throws', async () => {
    expect(productService.findAllSorted("name","WRONG")).rejects.toThrow();
  })

  it('get all sorted, wrong sortField, throws', async () => {
    expect(productService.findAllSorted("WRONG","asc")).rejects.toThrow();
  })

  it('get all filtered, gets all products correctly', async () => {
    mockRepository.findAllFiltered = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]);
    const actual = await productService.findAllFiltered("name",{searchString:"name"})

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])))
    expect(mockRepository.findAllFiltered).toBeCalled()
  })

  it('get all filtered, gets all products correctly', async () => {
    mockRepository.findAllFiltered = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]);
    const actual = await productService.findAllFiltered("NAME",{searchString:"name"})

    expect(actual).toEqual(expect.arrayContaining(([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])))
    expect(mockRepository.findAllFiltered).toBeCalled()
  })

  it('get all filtered, none found, throws', async () => {
    mockRepository.findAllFiltered = jest.fn().mockResolvedValue([]);

    expect(productService.findAllFiltered("name",{searchString:"name"})).rejects.toThrow();
    expect(mockRepository.findAllFiltered).toBeCalled()
  })

  it('get all filtered, name searchfield with number, throws', async () => {
    expect(productService.findAllFiltered("name",{searchNumber: 1})).rejects.toThrow();
  })

  it('get all filtered, description searchfield with number, throws', async () => {
    expect(productService.findAllFiltered("description",{searchNumber: 1})).rejects.toThrow();
  })

  it('get all filtered, expected_delivery_date searchfield with number, throws', async () => {
    expect(productService.findAllFiltered("expected_delivery_date",{searchNumber: 1})).rejects.toThrow();
  })

  it('get all filtered, number_in_stock searchfield with number, throws', async () => {
    expect(productService.findAllFiltered("expected_delivery_date",{searchString: "test"})).rejects.toThrow();
  })

  it('get all filtered, unit_price searchfield with number, throws', async () => {
    expect(productService.findAllFiltered("expected_delivery_date",{searchString: "test"})).rejects.toThrow();
  })
}
)