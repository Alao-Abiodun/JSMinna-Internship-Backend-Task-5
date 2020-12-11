const express = require('express');

const router = express.Router();

const customerCtrl = require('../controllers/customer.controller');

router.post('/signup', customerCtrl.signIn);
router.post('/login', customerCtrl.login);

module.exports = router;
