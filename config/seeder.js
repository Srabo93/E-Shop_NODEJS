const bcrypt = require("bcryptjs");
const sequelize = require("./database");

/* DB Connection and init DB*/
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Payment_Details = require("../models/Payment_Details");
const Product_Category = require("../models/Product_Category");

Product_Category.hasMany(Product);
Product.belongsTo(Product_Category);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Order.hasOne(Payment_Details);
Payment_Details.belongsTo(Order);

let categories = ["laptops", "fragrances", "smartphones", "homeDeco"];
let products = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549.0,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: 3,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: ["data/images/image-1677271522179-167023087.jpg"],
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899.0,
    discountPercentage: 17.94,
    rating: 2.44,
    stock: 34,
    brand: "Apple",
    category: 3,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    images: ["data/images/image-1677271508380-170019756.jpg"],
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249.0,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: 3,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    images: ["data/images/image-1677271493612-210134279.jpg"],
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280.0,
    discountPercentage: 17.91,
    rating: 1.3,
    stock: 123,
    brand: "OPPO",
    category: 3,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    images: ["data/images/image-1677271310927-290227319.jpg"],
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499.0,
    discountPercentage: 10.58,
    rating: 4.09,
    stock: 32,
    brand: "Huawei",
    category: 3,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
    images: ["data/images/image-1677272885944-312600097.jpg"],
  },
  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749.0,
    discountPercentage: 11.02,
    rating: 4.57,
    stock: 83,
    brand: "Apple",
    category: 1,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
    images: ["data/images/image-1677271447434-44502611.png"],
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499.0,
    discountPercentage: 4.15,
    rating: 2.25,
    stock: 50,
    brand: "Samsung",
    category: 1,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
    images: ["data/images/image-1677271435485-151529075.jpg"],
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499.0,
    discountPercentage: 10.23,
    rating: 3.43,
    stock: 68,
    brand: "Microsoft Surface",
    category: 1,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
    images: ["data/images/image-1677271412553-846169644.jpg"],
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099.0,
    discountPercentage: 11.83,
    rating: 4.54,
    stock: 96,
    brand: "Infinix",
    category: 1,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    images: ["data/images/image-1677271386017-988733635.jpg"],
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099.0,
    discountPercentage: 6.18,
    rating: 1.43,
    stock: 89,
    brand: "HP Pavilion",
    category: 1,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
    images: ["data/images/image-1677267512521-954615515.jpg"],
  },
  {
    id: 11,
    title: "perfume Oil",
    description:
      "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
    price: 13.0,
    discountPercentage: 8.4,
    rating: 4.26,
    stock: 65,
    brand: "Impression of Acqua Di Gio",
    category: 2,
    thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
    images: ["data/images/image-1677271251325-170546742.jpg"],
  },
  {
    id: 12,
    title: "Brown Perfume",
    description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    price: 40.0,
    discountPercentage: 15.66,
    rating: 4,
    stock: 52,
    brand: "Royal_Mirage",
    category: 2,
    thumbnail: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
    images: ["data/images/image-1677271241418-332014753.jpg"],
  },
  {
    id: 13,
    title: "Fog Scent Xpressio Perfume",
    description:
      "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
    price: 13.0,
    discountPercentage: 8.14,
    rating: 4.59,
    stock: 61,
    brand: "Fog Scent Xpressio",
    category: 2,
    thumbnail: "https://i.dummyjson.com/data/products/13/thumbnail.webp",
    images: ["data/images/image-1677271220029-734455890.jpg"],
  },
  {
    id: 14,
    title: "Non-Alcoholic Concentrated Perfume Oil",
    description:
      "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
    price: 120.0,
    discountPercentage: 15.6,
    rating: 4.21,
    stock: 114,
    brand: "Al Munakh",
    category: 2,
    thumbnail: "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
    images: ["data/images/image-1677271177202-457680430.jpg"],
  },
  {
    id: 15,
    title: "Eau De Perfume Spray",
    description:
      "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
    price: 30.0,
    discountPercentage: 10.99,
    rating: 4.7,
    stock: 105,
    brand: "Lord - Al-Rehab",
    category: 2,
    thumbnail: "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
    images: ["data/images/image-1678537749224-885644757.jpg"],
  },
  {
    id: 26,
    title: "Plant Hanger For Home",
    description:
      "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
    price: 41.0,
    discountPercentage: 17.86,
    rating: 4.08,
    stock: 131,
    brand: "Boho Decor",
    category: 4,
    thumbnail: "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
    images: ["data/images/image-1677271141838-522726528.jpg"],
  },
  {
    id: 27,
    title: "Flying Wooden Bird",
    description:
      "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
    price: 51.0,
    discountPercentage: 15.58,
    rating: 4.41,
    stock: 17,
    brand: "Flying Wooden",
    category: 4,
    thumbnail: "https://i.dummyjson.com/data/products/27/thumbnail.webp",
    images: ["data/images/image-1677271099623-208547984.jpg"],
  },
  {
    id: 28,
    title: "3D Embellishment Art Lamp",
    description:
      "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
    price: 20.0,
    discountPercentage: 16.49,
    rating: 4.82,
    stock: 54,
    brand: "LED Lights",
    category: 4,
    thumbnail: "https://i.dummyjson.com/data/products/28/thumbnail.jpg",
    images: ["data/images/image-1677271066228-252167998.jpg"],
  },
  {
    id: 29,
    title: "Handcraft Chinese style",
    description:
      "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
    price: 60.0,
    discountPercentage: 15.34,
    rating: 4.44,
    stock: 7,
    brand: "luxury palace",
    category: 4,
    thumbnail: "https://i.dummyjson.com/data/products/29/thumbnail.webp",
    images: ["data/images/image-1677270995123-248446326.jpg"],
  },
];
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));
sequelize
  .sync()
  .then(() => {
    categories.forEach((category) => {
      Product_Category.create({
        title: category,
        description: "This is Category resolving around" + category,
      });
    });
    let hashedPassword = bcrypt.hash("user123", 12).then((hashPw) => {
      User.create({
        email: "john@doe.com",
        firstName: "John",
        lastName: "Doe",
        password: hashPw,
      }).then((user) => {
        products.forEach((product) => {
          Product.create({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.images[0],
            rating: product.rating,
            productCategoryId: product.category,
            userId: 1,
          });
        });
      });
    });
  })
  .catch((error) => console.log(error));
