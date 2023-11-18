const USER = require('../../model/user/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ctrls = {};

ctrls.allSeller = async (req, res) => {
  const data = await USER.find().where({ role: 'seller' });
  res.json({ data });
};

ctrls.allUser = async (req, res) => {
  try {
    const data = await USER.find();
    if (!data) {
      res.status(404).json({
        message: 'error',
        body: 'not found',
      });
    }

    res.status(200).json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      body: error,
    });
  }
};

ctrls.signup = async (req, res) => {
  const { name, lastname, rut, address, phone, email, password, role } =
    req.body;

  const data = new USER({
    name,
    lastname,
    rut,
    address,
    phone,
    email,
    role,
    password,
  });
  const newEmail = await USER.findOne({ email: email });
  if (newEmail) {
    return res.json({
      message: 'error',
      body: 'auth/email-already-in-use',
    });
  } else {
    data.password = await bcrypt.hash(password, 10);
    const token = jwt.sign({ _id: data._id }, 'inventario');
    await data.save();
    res.json({
      message: 'success',
      body: data,
    });
  }
};

ctrls.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await USER.findOne({ email: email });

  if (!usuario) {
    return res.json({ message: 'error', body: 'auth/user-not-found' });
  }

  const hash = await bcrypt.compare(password, usuario.password);
  if (hash) {
    const token = jwt.sign({ _id: usuario._id }, 'inventario', {
      expiresIn: '1 days',
    });
    res.json({
      accessToken: token,
      user: usuario,
      message: 'Bienvenido',
    });
  } else {
    res.json({
      message: 'error',
      body: 'auth/wrong-password',
    });
  }
};

ctrls.updateUser = async (req, res) => {
  if (req.body.password == '' || !req.body.password) {
    console.log('password vacia');
    const { name, lastname, rut, address, phone, email, role } = req.body;
    const data = await USER.findOneAndUpdate(
      { _id: req.params.id },

      {
        name,
        lastname,
        rut,
        address,
        phone,
        email,
        role,
      },
      { new: true }
    );

    return res.json({
      new: true,
      message: 'success',
      body: data,
    });
  } else {
    console.log('no vacio');
    const { name, lastname, rut, address, phone, email, password } = req.body;
    const encrypt = await bcrypt.hash(password, 10);
    const data = await USER.findOneAndUpdate(
      { _id: req.params.id },

      {
        name,
        lastname,
        rut,
        address,
        phone,
        email,
        password: encrypt,
      },
      { new: true }
    );
    await data.save();
    return res.json({
      message: 'success',
      body: data,
    });
  }
};

ctrls.deleteUser = async (req, res) => {
  const user = await USER.findByIdAndDelete({ _id: req.params.id });

  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });

  res.json({
    message: 'success',
  });
};

module.exports = ctrls;
