import { Logger } from "../../app/util/logger";
import { prisma, shopping_cart, order_line, product } from "../../db/prisma";

export class CartRepository {
  private logger: Logger;

  public constructor() {
    this.logger = new Logger();
  }

  public async findShoppingCartByUserId(user_id: string) {
    this.logger.info("Getting shopping cart from repository.");
    return await prisma.shopping_cart.findFirst({
      where: {
        application_user_user_id: user_id
      },
      include: {
        shopping_cart_order_lines: {
          include: {
            order_line: true
          }
        }
      }
    })
  }

  public async getShoppingCartItems(cart_id: string) {
    this.logger.info(`Getting cart items from repository with id ${cart_id}.`);

    const shoppingCart = await prisma.shopping_cart.findFirst({
      where: { shopping_cart_id: cart_id },
      include: {
        shopping_cart_order_lines: {
          include: {
            order_line: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    return shoppingCart;
  }

  public async createShoppingCart(user_id: string) {
    this.logger.info("Creating cart from repository.");
    return await prisma.shopping_cart.create({
      data: {
        application_user_user_id: user_id
      },
      include: {
        shopping_cart_order_lines: {
          include: {
            order_line: true,
          }
        }
      }
    })
  }

  public async createOrderLineForShoppingCart(cart: shopping_cart, orderline: order_line): Promise<boolean> {
    this.logger.info("Add line to cart from repository.");

    const newOrderLine = await prisma.shopping_cart_order_lines.create({
      data: {
        shopping_cart: { connect: cart },
        order_line: { connect: orderline },
      },
    });

    return !!newOrderLine;
  }


  public async deleteShoppingCart(cart_id: string) {
    this.logger.info("Delete cart from repository.");

    await prisma.shopping_cart.delete({
      where: {
        shopping_cart_id: cart_id,
      }
    })
  }

  public async deleteShoppingCartItem(line_id: string) {
    this.logger.info("Delete cart from repository.");

    await prisma.shopping_cart_order_lines.delete({
      where: {
        order_lines_line_id: line_id,
      }
    })
  }

  public async updateShoppingCartOrderLineQuantity(orderLine: order_line) {
    this.logger.info("Update cart order line from repository.");
    return await prisma.order_line.update({
      where: {
        line_id: orderLine.line_id,
      },
      data: {
        quantity_ordered: orderLine.quantity_ordered,
      }
    });
  }

  public async findCartItemProductInShoppingCart(cart: shopping_cart, product: product): Promise<order_line> {
    this.logger.info("findCartItemProductInShoppingCart from repository.");

    const orderLine = await prisma.shopping_cart_order_lines.findFirst({
      where: {
        shopping_cart_shopping_cart_id: cart.shopping_cart_id,
        order_line: {
          product: {
            product_id: product.product_id
          }
        }
      }, include: {
        order_line: true
      }
    })

    if (orderLine)
      return orderLine.order_line;
    else
      return null;

  }

  public async saveProductToShoppingCart(cart: shopping_cart, product: product, qtyOrdered: number): Promise<order_line> {
    this.logger.info("Save product to cart from repository.");

    const orderLine = await prisma.order_line.create({
      data: {
        quantity_ordered: qtyOrdered,
        unit_price_order_line: product.unit_price,
        product_product_id: product.product_id
      },
    })

    await prisma.shopping_cart_order_lines.create({
      data: {
        shopping_cart_shopping_cart_id: cart.shopping_cart_id,
        order_lines_line_id: orderLine.line_id
      },
    })

    return orderLine;

  }




}