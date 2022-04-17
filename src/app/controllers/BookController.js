const BookATable = require('../models/BookATable');

class BookController { 
    //[POST] /
    makeABook(req, res, next) {
       const books=new BookATable(req.body)
       books.save()
        .then(() => res.redirect('/'))
        .catch(error => {})
    }
    
    //[DELETE] /books/:id
    destroy(req, res, next) {
        BookATable.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[DELETE] /books/:id/force
    forceDestroy(req, res, next) {
        BookATable.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    //[PATCH] /books/:id/restore
    restore(req, res, next) {
        BookATable.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }


}

module.exports = new BookController();
