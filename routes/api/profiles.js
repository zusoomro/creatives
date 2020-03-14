const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   GET api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      // putting a return here terminates the function
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profiles
// @desc    Create or update a user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    check('bio', 'Bio is required')
      .not()
      .isEmpty(),
    check('skills', 'Skills is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // Check that the validation passsed
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure fields from the request
    const {
      year,
      skills,
      bio,
      soundcloud,
      imgur,
      instagram,
      github
    } = req.body;

    // Build profile object
    const fields = {};
    fields.user = req.user.id;
    if (year) fields.year = year;
    if (bio) fields.bio = bio;
    if (skills) {
      fields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    fields.social = {};

    if (soundcloud) fields.social.soundcloud = soundcloud;
    if (imgur) fields.social.imgur = imgur;
    if (instagram) fields.social.instagram = instagram;
    if (github) fields.social.github = github;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // if a profile under this user already exists, update it
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: fields },
          { new: true }
        );

        return res.json(profile);
      }

      // create a profile
      profile = new Profile(fields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Errror');
    }
  }
);

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profileList = await Profile.find().populate('user', [
      'name',
      'avatar'
    ]);

    res.json(profileList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profiles/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profiles
// @desc    Delete profile, user, and posts for a user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user's posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
