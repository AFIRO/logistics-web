import { product } from "../../db/prisma";
import { ProductRepository } from "../repository/product.repository";
import { Logger } from "../../app/util/logger";

export class ProductService {
  private logger: Logger;
  public productRepository: ProductRepository;

  public constructor() {
    this.logger = new Logger();
    this.productRepository = new ProductRepository;
}

public async findAll(): Promise<product[]> {
  this.logger.info(`ProductService getting all products.`)
  const data = await this.productRepository.findAll();
  if (data.length != 0) {
      return data;
  }
  else {
      this.logger.error(`No products in database`)
      throw Error(`No products in database`)
  }
}

public async findAllSorted(sortField: string, sortOrder: string): Promise<product[]> {
  this.logger.info(`ProductService getting all products sorted.`)
  this.validateSortFieldAndSortOrder(sortField, sortOrder)
  const data = await this.productRepository.findAllSorted(sortField,sortOrder);
  if (data.length != 0) {
      return data;
  }
  else {
      this.logger.error(`No products in database`)
      throw Error(`No products in database`)
  }
}

public async findAllFiltered(searchField: string, searchTerms: {searchString?: string; searchNumber?: number;}): Promise<product[]> {
  this.logger.info(`ProductService getting all products filtered.`)
  this.validateSearchFieldAndSearchTerms(searchField, searchTerms)
  const data = await this.productRepository.findAllFiltered(searchField,searchTerms);
  if (data.length != 0) {
      return data;
  }
  else {
      this.logger.error(`No products in database`)
      throw Error(`No products in database`)
  }
}

public async findById(id: string): Promise<product> {
  this.logger.info(`ProductService getting product with id ${id}.`)
  const potentialProduct = await this.productRepository.findById(id)
  if (potentialProduct) {
      return potentialProduct;
  } else {
      this.logger.error(`Product with id ${id} not found in repository.`);
      throw Error(`Product with id ${id} not found`)
  }
}

public async updateProduct(product: product): Promise<product> {
  this.logger.info(`ProductService update product with id ${product.product_id}.`)

  return await this.productRepository.updateProduct(product);
   
}
 

private validateSearchFieldAndSearchTerms(searchField: string, searchTerms: {searchString?: string; searchNumber?: number;}){
  if (["name","description","expected_delivery_date"].includes(searchField.toLowerCase()) && !searchTerms.searchString){
    this.logger.error(`Passed searchTerm is incompatible with passed searchField (No String)`)
    throw Error(`Passed searchTerm is incompatible with passed searchField (No String)`)
  }

  if (["number_in_stock","unit_price"].includes(searchField.toLowerCase()) && !searchTerms.searchNumber){
    this.logger.error(`Passed searchTerm is incompatible with passed searchField (No Number)`)
    throw Error(`Passed searchTerm is incompatible with passed searchField (No Number)`)
  }
}

private validateSortFieldAndSortOrder(sortField: string, sortOrder: string){
  if (!["name","description","expected_delivery_date","number_in_stock","unit_price"].includes(sortField.toLowerCase())){
    this.logger.error(`Passed SortField is invalid`)
    throw Error(`Passed SortField is invalid`)
  }

  if (!["asc","desc"].includes(sortOrder.toLowerCase())){
    this.logger.error(`Passed SortOrder is invalid`)
    throw Error(`Passed SortOrder is invalid`)
  }
}


}