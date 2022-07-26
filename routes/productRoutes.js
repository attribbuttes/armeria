const express = require("express");
const router = express.Router();
const path = require('path');

const multer = require('multer');
const almacenamiento = multer.diskStorage({//configuracion de la instancia
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/')) //resolveme de ruta base
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  });
  
const upload = multer({ storage: almacenamiento })



const productController =  require('../controllers/productController');
router.get('/', productController.index)
router.get('/create', productController.create);
router.post('/', upload.single('image'), productController.store)
router.get('/detail/:id', productController.detail);
router.get('/armasCortas', productController.armasCortas);
router.get('/armasLargas', productController.armasLargas);
router.get('/camping', productController.camping);



router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/shoppingCart', productController.shoppingCart);





module.exports = router;