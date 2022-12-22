const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
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


app.listen(8000, () => console.log('app is listening'))