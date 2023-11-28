const CLIENTUSER = require('../../model/clientUser/clientUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ctrls = {};

ctrls.allClientUsers = async (req, res) => {
  try {
    const data = await CLIENTUSER.find().populate('company');
    if (!data) {
      res.status(404).json({
        message: 'error',
        body: 'Not found',
      });
    }
    res.status(200).json({
      message: 'success',
      body: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      body: error,
    });
  }
};

ctrls.signUp = async (req, res) => {
  try {
    const { name, lastname, phone, email, password, company, faena } = req.body;

    const data = new CLIENTUSER({
      name,
      lastname,
      phone,
      email,
      password,
      company,
      faena,
    });
    const userExist = await CLIENTUSER.findOne({ email: email });
    if (userExist) {
      return res.json({
        message: 'Email already in use.',
        body: 'auth/email-already-in-use',
      });
    } else {
      data.password = await bcrypt.hash(password, 10);
      const token = jwt.sign({ _id: data._id }, 'algunaclave');

      await data.save();

      return res.json({
        message: 'success',
        body: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'An unexpected error ocurred',
      body: error,
    });
  }
};

ctrls.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await CLIENTUSER.findOne({ email: email });

    if (!user)
      return res.json({
        message: 'error',
        body: 'Incorrect email and / or password ',
      });

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (hashedPassword) {
      const token = jwt.sign({ _id: user._id }, 'algunaclave', {
        expiresIn: '1 days',
      });
      res.json({
        accessToken: token,
        user: user._id,
        message: 'Bienvenido',
      });
    } else {
      res.json({
        message: 'error',
        body: 'Incorrect email and / or password ',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'An unexpected error ocurred.',
      body: error,
    });
  }
};

ctrls.updateUser = async (req, res) => {
  try {
    if (req.body.password === '' || !req.body.password) {
      const { name, lastname, email, phone, company, faena } = req.body;

      const data = await CLIENTUSER.findOneAndUpdate(
        { _id: req.params.id },

        {
          name,
          lastname,
          phone,
          email,
          company,
          faena,
        },
        { new: true }
      );
      return res.json({
        new: true,
        message: 'success',
        body: data,
      });
    } else {
      const { name, lastname, email, password, phone, company, faena } =
        req.body;

      const encryptedPass = await bcrypt.hash(password, 10);
      const data = await CLIENTUSER.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          lastname,
          phone,
          email,
          password: encryptedPass,
          company,
          faena,
        },
        { new: true }
      );
      await data.save();
      return res.json({
        message: 'success',
        body: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error.',
      body: error,
    });
  }
};

ctrls.deleteUser = async (req, res) => {
  const user = await CLIENTUSER.findByIdAndDelete({ _id: req.params.id });

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  return res.json({
    message: 'success',
  });
};

module.exports = ctrls;
