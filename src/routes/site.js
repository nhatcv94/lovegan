const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const adminController = require('../app/controllers/AdminController');
const bookController = require('../app/controllers/BookController');




router.get('/logout', adminController.logout);
router.get('/register', adminController.register);
router.post('/register', adminController.reg);
router.get('/login', adminController.login);
router.post('/login', adminController.log);
///////////////////////////////////////
router.get('/blog-single', siteController.blogSingle);
router.get('/reservation', siteController.reservation);
router.post('/reservation', bookController.makeABook);
router.get('/blog', siteController.blog);
router.get('/menu', siteController.menu);
router.get('/admin',adminController.check ,siteController.admin);
router.post('/', bookController.makeABook);
router.get('/', siteController.home);
router.get('*', siteController.notFound);
module.exports = router;
