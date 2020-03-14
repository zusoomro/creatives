import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    console.log('loading post');
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  return loading || post == null ? (
    <Spinner animation="border" />
  ) : (
    <div className="pb-3">
      <Button size="sm" as={Link} to="/posts" variant="light">
        Go back
      </Button>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id} />
      <div>
        {post.comments.map(comment => (
          <CommentItem postId={post._id} key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
