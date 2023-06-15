class Product {
    product_id: string
    description: string | null
    expected_delivery_date: Date | null
    name: string | null
    number_in_stock: number
    picture: string | null
    unit_price: number

   
    diminishQuantity(amount: number): void {
        if (amount > this.number_in_stock) {
          throw new Error(`Not enough quantity available for product ${this.name}`);
        }
        this.number_in_stock -= amount;
      }

}
