const { Router } = require('express');
const router = Router();
const {
  allProviders,
  createProvider,
  deleteProvider,
  updateProvider,
} = require('../../controllers/providers/controllers.providers');

router.get('/allproviders', allProviders);
router.post('/createprovider', createProvider);
router.put('/updateprovider/:id', updateProvider);
router.delete('/deleteprovider/:id', deleteProvider);

module.exports = router;
