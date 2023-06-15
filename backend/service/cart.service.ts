import { CartRepository } from '../repository/cart.reposistory';
import { Logger } from "../../app/util/logger";
import { shopping_cart, product } from '../../db/prisma';

export class CartService {
    private logger: Logger;
    private cartRepository: CartRepository;

    public constructor() {
        this.logger = new Logger();
        this.cartRepository = new CartRepository();
    }

    public async findByUserId(user_id: string) {
        this.logger.info(`CartService getting cart with id ${user_id}.`)

        const shoppingCart = await this.cartRepository.findShoppingCartByUserId(user_id)
        if (!shoppingCart) {
            this.logger.error(`Cart with user_id ${user_id} not found in repository.`);
        }
        return shoppingCart;
    }


    public async createShoppingCartForUser(user_id: string) {
        this.logger.info(`CartService create new cart.`);

        let shoppingCart = await this.findByUserId(user_id)
        if (!shoppingCart) {
            shoppingCart = await this.cartRepository.createShoppingCart(user_id);
        }
        return shoppingCart;

    }

    public async createOrderLineForShoppingCart(cart: shopping_cart, product: product, quantity: number) {

        this.logger.info(`CartService add product with id ${product.product_id} to cart with id ${cart.shopping_cart_id}.`)

        if (cart) {
            let existingitem = await this.cartRepository.findCartItemProductInShoppingCart(cart, product);
            if (existingitem) {
                existingitem.quantity_ordered = quantity;
                await this.cartRepository.updateShoppingCartOrderLineQuantity(existingitem);
            }
            else {
                await this.cartRepository.saveProductToShoppingCart(cart, product, quantity);

            }
        }

    }

    public async deleteShoppingCartItem(line_id: string) {

        this.logger.info(`CartService remove cart item with id ${line_id}.`)

        await this.cartRepository.deleteShoppingCartItem(line_id)

    }


    public async deleteShoppingCart(cart_id: string) {

        this.logger.info(`CartService remove cart with id ${cart_id}.`)

        await this.cartRepository.deleteShoppingCart(cart_id)

    }

    public async getAllShoppingCartItems(cart_id: string) {

        const shoppingCartItems = await this.cartRepository.getShoppingCartItems(cart_id);

        return shoppingCartItems;
    }

}