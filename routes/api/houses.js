const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

// @desc    Get your house
// @route   GET api/house
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const house = await house.findById(user.house);

    if (!house) {
      res.json({ msg: "You don't belong to a house yet!" });
    }

    res.json(house);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

module.exports = router;
