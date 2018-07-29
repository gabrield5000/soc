const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

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

const productController = require('../controllers/products');

router.get('/', productController.get_all);

router.post('/', checkAuth, upload.single('Image'), productController.create_one);

router.get('/:id', productController.get_one);

router.patch('/:id', checkAuth, productController.update_one);

router.delete("/:id", checkAuth, productController.delete_one);

module.exports = router;