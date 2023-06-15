import { prisma, product } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { Logger } from "../../app/util/logger";
import { log } from "console";

export class ProductRepository {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger();
  }

  public async findAll(): Promise<product[]> {
    this.logger.info("Getting all products from repository.");
    return await prisma.product.findMany({ orderBy: { name: "desc" } });
  }

  public async updateProduct(product: product): Promise<product> {
    this.logger.info("Update product number_in_stock from repository.");
    return await prisma.product.update(
      {
        where: {
          product_id: product.product_id,
        },
        data: product
      })
  }

  public async findAllSorted(
    sortField: string,
    sortOrder: string
  ): Promise<product[]> {
    this.logger.info(
      `Getting all products from repository sorted on ${sortField.toLowerCase()} ${sortOrder.toLowerCase()}.`
    );
    let sortOrderParsed: Prisma.SortOrder;
    if (sortOrder.toLowerCase() === "asc") {
      sortOrderParsed = Prisma.SortOrder.asc;
    } else {
      sortOrderParsed = Prisma.SortOrder.desc;
    }

    switch (sortField.toLowerCase()) {
      case "name": {
        return await prisma.product.findMany({
          orderBy: { name: sortOrderParsed },
        });
      }
      case "description": {
        return await prisma.product.findMany({
          orderBy: { description: sortOrderParsed },
        });
      }
      case "expected_delivery_date": {
        return await prisma.product.findMany({
          orderBy: { expected_delivery_date: sortOrderParsed },
        });
      }

      case "number_in_stock": {
        return await prisma.product.findMany({
          orderBy: { number_in_stock: sortOrderParsed },
        });
      }
      case "unit_price": {
        return await prisma.product.findMany({
          orderBy: { unit_price: sortOrderParsed },
        });
      }
      default: {
        return await prisma.product.findMany({
          orderBy: { name: "desc" },
        });
      }
    }
  }

  public async findAllFiltered(
    searchField: string,
    searchTerms: {
      searchString?: string;
      searchNumber?: number;
    }
  ): Promise<product[]> {
    this.logger.info(
      `Getting all products from repository filtered on ${searchField.toLowerCase()}.`
    );
    switch (searchField.toLowerCase()) {
      case "name": {
        return await prisma.product.findMany({
          where: { name: searchTerms.searchString },
        });
      }
      case "description": {
        return await prisma.product.findMany({
          where: { description: searchTerms.searchString },
        });
      }
      case "expected_delivery_date": {
        return await prisma.product.findMany({
          where: { expected_delivery_date: searchTerms.searchString },
        });
      }

      case "number_in_stock": {
        return await prisma.product.findMany({
          where: { number_in_stock: searchTerms.searchNumber },
        });
      }
      case "unit_price": {
        return await prisma.product.findMany({
          where: { unit_price: searchTerms.searchNumber },
        });
      }
      default: {
        return await prisma.product.findMany();
      }
    }
  }

  public async findById(id: string): Promise<product> {
    this.logger.info(`Getting product with id ${id}`);
    return await prisma.product.findUnique({
      where: {
        product_id: id,
      },
    });
  }

  public async existsById(id: string) {
    this.logger.info(`Checking if product with id ${id} exists in database.`);
    return (
      0 != (await prisma.product.count({ where: { product_id: id } }))
    );
  }
}
