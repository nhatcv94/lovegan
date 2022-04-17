const home=require('../pages/home.json')
const Menu=require("../models/Menu")
const Customer=require("../models/Customer")
const User=require("../models/User")
const jwt = require('jsonwebtoken');
class SiteController {
    home(req, res, next) {
        if(req.cookies.UserToken){
            var userId=jwt.verify(req.cookies.UserToken, 'shhh')
            Promise.all([Menu.find().limit(3).skip(4).lean(), home, Customer.find().limit(5).lean(), User.findOne({_id: userId._id}).lean()])
                .then(([menu, home, customer, user]) => {
                    res.render('site/home', {menu,home, customer, user})
                })
                .catch(next);
        }else{
            Promise.all([Menu.find().limit(3).skip(4).lean(), home, Customer.find().limit(5).lean()])
                .then(([menu, home, customer, user]) => res.render('site/home', {menu,home, customer, user}))
                .catch(next);
        }
           
    }
    blog(req, res, next) {
        res.render('site/blog')
    }
    blogSingle(req, res, next) {
        res.render('site/blog-single')
    }
    menu(req, res, next){
        Menu.find({}).lean()
        .then(menu => res.render('site/menu',{menu}))
        .catch(next)
    }  
    reservation(req, res, next) {
        res.render('site/reservation')
    }
    admin(req, res){
        res.render('site/admin');
    }
    notFound(req, res){
        res.status(404).render('site/notFound');
    }
}

module.exports = new SiteController();
