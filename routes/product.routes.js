const router = require('express').Router();
const productController = require('../controllers/prod.controller');
const authController = require('../controllers/auth.controller');
const authShop = require('../middleware/authShop');
const auth = require('../middleware/auth');



router.get('/', authShop, productController.getProducts)
router.post('/', authShop, productController.createProduct)

router.route('/:id')
      .get(auth,authShop,productController.getProduct)
      .delete(auth,authShop,productController.deleteProduct)
      .put(auth, productController.updateProduct)

module.exports = router;
