import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model,
      wishListItems: Model,
      cartItems: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
      this.resource("wishListItems");
      this.resource("cartItems");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          id: faker.random.id,
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          description: faker.commerce.productDescription(),
          product: faker.commerce.product(),
          productAdjective: faker.commerce.productAdjective(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.random.boolean(),
          fastDelivery: faker.random.boolean(),

          offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "Republic Day Sale"
          ]),

          rating: faker.random.arrayElement([
            "1",
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5"
          ]),

          color: faker.commerce.color()
        });
      });
    }
  });
}
