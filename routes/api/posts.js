const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Make a post
// @access  Private
router.post(
  '/',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      const post = new Post(newPost);

      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const postList = await Post.find().sort({ date: -1 });
    res.json(postList);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:post_id
// @desc    Get a post by post id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Could not find the post.' });
    }

    res.json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Could not find the post.' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Get a post by post id
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Make sure the post exists
    if (!post) {
      return res.status(404).json({ msg: 'Could not find the post.' });
    }

    // Make sure that the user deleting the post is the same as the user that made it
    if (req.user.id !== post.user.toString()) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    await post.remove();

    res.json({ msg: 'Post deleted.' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Could not find the post.' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post by id
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.json({ msg: 'Could not find the post' });
    }

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length !==
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post by id
// @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.json({ msg: 'Could not find the post' });
    }

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'User has not liked the post' });
    }

    // get the index of the like by creating an array of user id strings
    const index = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(index, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Post a comment
// @access  Private
router.post(
  '/comment/:post_id',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const post = await Post.findById(req.params.post_id);

      const user = await User.findById(req.user.id).select('-password');

      if (!post) {
        return res.status(400).json({ msg: 'Could not find the post.' });
      }

      post.comments.unshift({
        user: user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    // get the post and make sure it exists
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Could not find the post' });
    }

    // get the comment and make sure it exists
    const comment = post.comments.find(
      comment => req.params.comment_id === comment.id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Could not find the comment' });
    }

    // make sure the user is the creator of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // delete the comment
    const commentIndex = post.comments.findIndex(
      comment => comment.id === req.params.comment_id
    );

    post.comments.splice(commentIndex, 1);

    // save the post
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
