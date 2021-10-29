
const lowdb = require('lowdb');

const Filesync = require('lowdb/adapters/FileSync');
const adapter = new Filesync('cart.json');
const dbCart = lowdb(adapter);

const adapter1 = new Filesync('products.json');
const dbProduct = lowdb(adapter1);


//handlers
//**    Add To cart    **/
exports.addToCart = (request, response) => {

    //!add the same product to the shopping cart again
    if (dbCart.get('cartlist').map('id').value().includes
        (parseInt(request.params.id))) {

        response.status(400).send('Product Exists! Cannot be added again!');

    }//!add a product that does not exist in product list
    else if (!dbProduct.get('product').map('id').value().includes(parseInt(request.params.id))) {
        response.status(400).send('Product with this id is not in product list!');
    }
    else {
        const cartItem = dbProduct.get('product')
            .find({ id: parseInt(request.params.id) })
            .value();
        dbCart.get('cartlist')
            .push(cartItem)
            .write();
        response.json({
            status: 'success',
            message: 'Added to cart',
        })
    }

}
//**    Display cart item   **/
exports.displayCart = (request, response) => {

    const updatedCart = dbCart.get('cartlist').value();
    if (updatedCart.length === 0) {
        response.status(400).send('No item to display in the cart');
    } else {
        response.json(updatedCart);
    };
}
//**    Delete cart item    **/
exports.deleteCart = (request, response) => {

    if (dbCart.get('cartlist') //check whether prod with req id is available to delete
        .map('id')
        .value()
        .includes(parseInt(request.params.id))) {
        const cartItem = dbCart.get('cartlist')
            .find({ id: parseInt(request.params.id) })
            .value();
        dbCart.get('cartlist')
            .remove(cartItem)
            .write();
        response.json({
            status: 'success',
            message: 'cart item deleted'
        })
    }
    else
        response.status(400).send('Product with this id is not in cart!');

}

