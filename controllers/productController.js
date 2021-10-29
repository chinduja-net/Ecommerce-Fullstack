const lowdb = require('lowdb');
const Filesync = require('lowdb/adapters/FileSync');
const adapter = new Filesync('products.json');
const dbProduct = lowdb(adapter);

//handlers
exports.getAllProducts = (request, response) => {

    const productList = dbProduct.get('product')
        .value();
    response.json(productList);
}

exports.getFilteredProduct = (request, response) => {
    const productSearch = dbProduct.get('product').find({ name: (request.params.name) }).value();
    response.json(productSearch);


}