const router = require('express').Router();
const contactController = require('../controllers/contact.controller');
const sendMail = require('../mail/Config');
const authAdmin = require('../middleware/authAdmin');


router.route('/')
      .get(authAdmin, contactController.getRequests)
      .post(contactController.createRequest)

router.route('/:id')
      .put(authAdmin, contactController.updateRequest)

router.route('/status/:id')
      .put(authAdmin, contactController.updateStatusRequest)

router.route('/open')
      .get(authAdmin, contactController.getOpenRequests)

router.route('/closed')
      .get(authAdmin, contactController.getClosedRequests)

router.route('/request/:id')
      .get(authAdmin, contactController.getRequest)

router.route('/send')
      .post(authAdmin, sendMail.sendMail)

module.exports = router;
