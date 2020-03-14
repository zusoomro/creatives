const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

// @desc    Get user item with a token.
// @route   GET api/auth
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

// @desc    Authenticate a user and get a JWT token
// @route   POST api/auth
// @access  Public
router.post(
  '/',
  // Using express validator, make sure that all the fields are legit
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please enter a password.').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check to make sure that the user exists.
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      // Compare the given password to the user's password.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      // Return the jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 900 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
