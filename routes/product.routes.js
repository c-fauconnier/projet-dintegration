const router = require('express').Router();
const productController = require('../controllers/prod.controller');
const authController = require('../controllers/auth.controller');
const authShop = require('../middleware/authShop');
const auth = require('../middleware/auth');



router.route('/')
      .get(productController.getProducts)
      .post(authShop, productController.createProduct)


router.route('/:id')
      .get(authShop, productController.getProduct)
      .delete(authShop, productController.deleteProduct)
      .put(authShop, productController.updateProduct)

module.exports = router;
