const express = require('express');
const app = express();
const path = require('path');

//const cors = require('cors');
//app.use(cors());

app.use(express.static('frontend'));


const productsRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

//body parser
app.use(express.json());

//mounting new router on a route
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.listen(3000, () => {
    console.log('server started...');

})