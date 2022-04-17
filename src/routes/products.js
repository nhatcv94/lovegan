const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.delete('/:id/force', productController.forceDestroy); // xóa vĩnh viễn một món ăn
router.patch('/:id/restore', productController.restore); // khôi phục món ăn
router.get('/:slug', productController.show); // show 1 món ăn 
router.put('/:id', productController.update);// sửa món ăn
router.delete('/:id', productController.destroy); // xóa món ăn
router.post('/', productController.store); // thêm mới món ăn
router.get('/', productController.index);  //show tất cả món ăn

module.exports = router;