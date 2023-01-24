const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/database");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const {
  authenticationHandler,
  csurfTokenHandler,
} = require("./middlewares/auth");
const { send404Page, send500Page } = require("./controllers/error");

const app = express();
require("dotenv").config();

/* DB Connection and init DB*/
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));
sequelize.sync();

/* Set View Engine EJS */
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: sequelize,
    }),
    saveUninitialized: false,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
  })
);

app.use(authenticationHandler);
app.use(csurfTokenHandler);

app.use(shopRoutes);
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.get("/500", send500Page);
app.use(send404Page);
app.use((error, req, res, next) => {
  res.status(500).render("500", { pageTitle: "Error", path: "/500" });
});

app.listen(process.env.PORT, () => console.log("app is listening"));
