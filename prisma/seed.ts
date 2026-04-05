import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "1",
    name: "MacBook Pro 16",
    description: "Powerful laptop for coding and design",
    price: 199999,
    discount: 10000,
    category: "Electronics",
    images: ["/products/macbook-pro.png"],
    stock: 5,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Nike Air Max",
    description: "Comfortable and stylish running shoes",
    price: 8999,
    discount: 1000,
    category: "Clothing",
    images: ["/products/nike-shoes.png"],
    stock: 15,
    rating: 4.5,
  },
  {
    id: "3",
    name: "The Clean Code Book",
    description: "Essential guide to writing maintainable code",
    price: 599,
    discount: null,
    category: "Books",
    images: ["/products/clean-code.png"],
    stock: 20,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise-canceling wireless headphones",
    price: 24990,
    discount: 3000,
    category: "Electronics",
    images: ["/products/sony-headphones.png"],
    stock: 8,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Levi's 501 Jeans",
    description: "Classic durable denim jeans",
    price: 4999,
    discount: 500,
    category: "Clothing",
    images: ["/products/levis-jeans.png"],
    stock: 25,
    rating: 4.3,
  },
  {
    id: "6",
    name: "iPad Air 11",
    description: "Versatile tablet for work and entertainment",
    price: 79999,
    discount: null,
    category: "Electronics",
    images: ["/products/ipad-air.png"],
    stock: 10,
    rating: 4.6,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
