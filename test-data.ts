// Exercise 5 — Test data

// Step 1: Define a type for a product
type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

// Step 2: Create two products using this type
const laptop: Product = {
  name: "MacBook Pro",
  price: 2499.99,
  inStock: true,
};

const monitor: Product = {
  name: "Dell 27 inch",
  price: 399.99,
  inStock: false,
};

// Step 3: Write a helper function with template string
function formatPrice(price: number): string {
  return `$${price}`;
}

console.log(formatPrice(laptop.price));    // "$2499.99"
console.log(formatPrice(monitor.price));   // "$399.99"

// Step 4: Export for use in other files (Week 6 pattern)

// Capstone — Credentials type + login URL builder
type Credentials = {
  email: string;
  password: string;
  role?: string;
};

const validUser: Credentials = {
  email: "student@test.com",
  password: "Password123",
  role: "admin",
};

function getLoginUrl(env: string): string {
  return `https://${env}.example.com/login`;
}

export { laptop, monitor, formatPrice, validUser, getLoginUrl };