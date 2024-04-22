const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { user_email, user_password } = req.body;

  console.log('req.body', req.body);

  try {
    let user = await User.findOne({ user_email });
    if (user) {
      return res.status(400).send('User with the provided email already exists.');
    }

    user = new User(req.body);
    user.user_password = await bcrypt.hash(user_password, 8);

    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (e) {
    console.error('Error registering user:', e);
    res.status(500).send('Something went wrong. Try again later.');
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_email: req.body.user_email });
    if (!user) {
      return res.status(400).send('User with provided email does not exist.');
    }

    const isMatch = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );

    if (!isMatch) {
      return res.status(400).send('Invalid credentials.');
    }
    const { user_password, ...rest } = user.toObject();

    return res.send(rest);
  } catch (error) {
    return res.status(500).send('Something went wrong. Try again later.');
  }
};
