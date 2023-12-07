const { Router } = require('express');
const router = Router();
const { allFaenas } = require('../../controllers/faenas/controllers.faenas');

router.get('/allfaenas', allFaenas);

module.exports = router;
