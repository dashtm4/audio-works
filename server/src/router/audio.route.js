const express = require('express');
const { audioController } = require('../controllers');

const router = express.Router();

router.get('/list', audioController.fetchList);
router.get('/downstream/:id', audioController.downstream);
router.post('/upstream', audioController.upstream);

module.exports = router;
