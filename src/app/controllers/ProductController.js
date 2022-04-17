const Menu = require('../models/Menu');

class ProductController { 
    //[GET] product/
    index(req, res, next) {
        Menu.find({}).lean()
            .then(products => res.render('products/showFull', {products}))
            .catch(next);
    }

    //[GET] product/:slug 
    show(req, res, next) {
        Menu.findOne({ slug: req.params.slug }).lean()
            .then(product => res.render('products/showOne', {product}))
            .catch(next);
    }

    //[POST] products
    store(req, res, next) {
       const menu=new Menu(req.body)
       menu.save()
        .then(() => res.redirect('/admin/stored/products'))
        .catch(error => {})
    }
    
    //[PUT] /products/:id
    update(req, res, next) {
        Menu.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect("/admin/stored/products"))
            .catch(next)    
        
    }
    //[DELETE] /product/:id
    destroy(req, res, next) {
        Menu.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[DELETE] /products/:id/force
    forceDestroy(req, res, next) {
        Menu.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[PATCH] /cources/:id/restore
    restore(req, res, next) {
        Menu.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }


}

module.exports = new ProductController();
