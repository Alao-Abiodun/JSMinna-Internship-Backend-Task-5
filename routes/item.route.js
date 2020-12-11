const express = require('express');

const router = express.Router();

const itemCtrl = require('../controllers/item.controller');

const auth = require('../middleware/auth');

router.post('/suggest', auth, itemCtrl.addSuggestion);
router.get(
  '/suggested/:category',
  auth,
  itemCtrl.getAllItemsByCategorySuggestion
);
router.get('/suggested', auth, itemCtrl.getAllItemSuggestion);

module.exports = router;
