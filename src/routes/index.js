const siteRouter = require('./site');
const productsRouter = require('./products');
const adminRouter = require('./admin');
const bookRouter = require('./books');


function route(app) {
    app.use('/admin', adminRouter);
    app.use('/products', productsRouter);
    app.use('/books', bookRouter);
    app.use('/', siteRouter);
}

module.exports = route;
