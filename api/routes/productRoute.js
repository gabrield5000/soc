'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');   
const { validateBody, schemas } = require('../middleware/JoiValidation');
const checkAuth = require('../middleware/checkAuth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, new Data().toISOString + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb (null, true);
    } else {
        cb (null, false);
    }
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const productController = require('../controllers/productController');

router.get('/', productController.list);

router.post('/', validateBody(schemas.productSchema), upload.single('Image'), productController.add);

router.get('/:id', productController.get);

router.patch('/:id', productController.update);

router.delete("/:id", productController.delete);

module.exports = router;