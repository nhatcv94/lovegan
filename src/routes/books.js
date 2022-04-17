const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/BookController');

router.delete('/:id/force', bookController.forceDestroy); // xóa vĩnh viễn một book
router.patch('/:id/restore', bookController.restore); // khôi phục book
router.delete('/:id', bookController.destroy); // xóa book

module.exports = router;