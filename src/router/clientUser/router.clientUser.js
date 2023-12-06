const { Router } = require('express');
const router = Router();
const {
  allClientUsers,
  signUp,
  login,
  updateUser,
  deleteUser,
} = require('../../controllers/clientUsers.js/controllers.clientUsers');
const {
  alljobforRole,
} = require('../../controllers/trabajos/controllers.trabajos');
const {
  alljobforRole,
} = require('../../controllers/trabajos/controllers.trabajos');

router.get('/allclientusers', allClientUsers);
router.get('/alljobforrole/:company/:faena', alljobforRole);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;
