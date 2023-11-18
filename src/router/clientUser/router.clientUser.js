const { Router } = require('express');
const router = Router();
const {
  allClientUsers,
  signUp,
  login,
  updateUser,
  deleteUser,
} = require('../../controllers/clientUsers.js/controllers.clientUsers');

router.get('/allclientusers', allClientUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;
