import { prisma } from "../../../db/prisma";
import { ProductRepository } from "../../../backend/repository/product.repository";
import { TestData } from "../../test.data"

const productRepository = new ProductRepository();

describe('product repository tests', () => {
  it('get all to return objects correctly', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT])
    expect(await productRepository.findAll()).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT]))
    expect(prisma.product.findMany).toHaveBeenCalled()
  })

  it('get by id to return object correctly', async () => {
    prisma.product.findUnique = jest.fn().mockResolvedValue(TestData.TEST_PRODUCT);
    expect(await productRepository.findById(TestData.ID)).toEqual(TestData.TEST_PRODUCT)
    expect(prisma.product.findUnique).toHaveBeenCalled()
  })

  it('exists by id, entity exists, returns true', async () => {
    prisma.product.count = jest.fn().mockResolvedValue(1);
    expect(await productRepository.existsById(TestData.ID)).toEqual(true)
    expect(prisma.product.count).toHaveBeenCalled()
  })

  it('exists by id, entity does not exist, returns false', async () => {
    prisma.product.count = jest.fn().mockResolvedValue(0);
    expect(await productRepository.existsById(TestData.ID)).toEqual(false)
    expect(prisma.product.count).toHaveBeenCalled()
  })

  it('get all sorted by name to return all objects correctly in order', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllSorted("name","asc")).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
    })
  })

  it('get all sorted by description to return all objects correctly in order', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllSorted("description","asc")).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      orderBy: { description: "asc" },
    })
  })

  it('get all sorted by expected_delivery_date to return all objects correctly in order', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllSorted("expected_delivery_date","asc")).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      orderBy: { expected_delivery_date: "asc" },
    })
  })

  it('get all sorted by number_in_stock to return all objects correctly in order', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllSorted("number_in_stock","asc")).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      orderBy: { number_in_stock: "asc" },
    })
  })

  it('get all sorted by unit_price to return all objects correctly in order', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllSorted("unit_price","asc")).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      orderBy: { unit_price: "asc" },
    })
  })

  it('get all sorted wrong search field to return all objects correctly in default order', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllSorted("WRONG","asc")).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      orderBy: { name: "desc" },
    })
  })

  it('get all filtered by name to return all objects filtered', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllFiltered("name",{searchString:"name"})).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { name: "name" },
    })
  })

  it('get all filtered by description to return all objects filtered', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllFiltered("description",{searchString:"name"})).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { description: "name" },
    })
  })

  it('get all filtered by expected_delivery_date to return all objects filtered', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllFiltered("expected_delivery_date",{searchString:"name"})).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { expected_delivery_date: "name" },
    })
  })

  it('get all filtered by number_in_stock to return all objects filtered', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllFiltered("number_in_stock", {searchNumber:1})).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { number_in_stock: 1 },
    })
  })

  it('get all filtered by unit_price to return all objects filtered', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllFiltered("unit_price", {searchNumber:1})).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { unit_price: 1 },
    })
  })

  it('get all filtered by wrong searchField to return all objects', async () => {
    prisma.product.findMany = jest.fn().mockResolvedValue([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2])
    expect(await productRepository.findAllFiltered("WRONG", {searchNumber:1})).toEqual(expect.arrayContaining([TestData.TEST_PRODUCT,TestData.TEST_PRODUCT_2]))
    expect(prisma.product.findMany).toBeCalled()
  })
  
}
)
  