const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const sequelize = require('./config/database')
const productModel = require('./models/Product')
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin')
const {send404Page} = require("./controllers/error");


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', shopRoutes)
app.use('/admin', adminRoutes);
app.use(send404Page)


sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
sequelize.sync()
app.listen(8000, () => console.log('app is listening'))