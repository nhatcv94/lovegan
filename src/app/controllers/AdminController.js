const Menu = require('../models/Menu');
const User = require('../models/User');
const BookATalbe = require('../models/BookATable');
const jwt = require('jsonwebtoken');
class AdminController{
    
    createProduct(req, res, next) {
        res.render('admin/products/create-products')
    }

    //[GET] /products/:id/edit
    editProduct(req, res, next) {
        Menu.findById(req.params.id).lean()
            .then(product => res.render('admin/products/edit-products', {product}))
            .catch(next)                      
    }

    //[GET] /admin/stored/products
     storedProducts(req, res, next){
        Promise.all([Menu.find({}).lean(), Menu.countDocumentsDeleted()])
            .then(([products, deletedCount]) => res.render('admin/products/stored-products', {deletedCount, products}))
            .catch(next);
       }

    //[GET] /admin/trash/products
    trashProducts(req, res, next){
        Menu.findDeleted({}).lean()
            .then(products => res.render('admin/products/trash-products', {products}))
            .catch(next);
    }

    //[GET] /register
    register(req, res, next) {
        res.render('user/register')
    }
    //[GET] /login
    login(req, res, next) {
        res.render('user/login')
    }



     //[POST] /login
    log(req, res, next) {
        User.findOne({username:req.body.username, password:req.body.password})
        .then(user=>{
            if(user){
                var token = jwt.sign({ _id: user._id }, 'shhh');
                res.cookie('UserToken', token)
                res.redirect('/admin')
            }
            else{
                res.json("Đăng nhập không thành công")
            }
        })
        .catch(err=>{message:"lỗi server"})
    }
    //check admin
    check(req, res, next){
        try{
            var token=req.cookies.UserToken;
            var idUser=jwt.verify(token, 'shhh')
            if(idUser){
                User.findOne({_id: idUser})
                .then(user=>{
                    if(user.role=="admin"){
                        next()
                    }
                    else if(user.role=="user")
                        res.redirect('/')
                })
                .catch(err=>{message:"Lỗi"})
            }
        }catch(err){
            return res.redirect("/login")
        }
    }
    //[GET] /logout
    logout(req, res, next){
        res.clearCookie('UserToken',req.cookies.UserToken);
        res.redirect('/login');
    }

    //[POST] /register
    reg(req, res, next) {
        const user=new User(req.body)
        user.save()
        .then(() => res.redirect('/login'))
        .catch(error => {message:"Đăng kí không thành công"})
    }
    //[GET] /admin/stored/books
    storedBooks(req, res, next){
        Promise.all([BookATalbe.find({}).lean(), BookATalbe.countDocumentsDeleted()])
        .then(([books, deletedCount]) => res.render('admin/books/stored-books', {deletedCount, books}))
        .catch(next);
    }

    //[GET] /admin/trash/books
    trashBooks(req, res, next){
        BookATalbe.findDeleted({}).lean()
            .then(books => res.render('admin/books/trash-books', {books}))
            .catch(next);
    }

}

module.exports = new AdminController();
