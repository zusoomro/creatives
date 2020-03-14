import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from 'react-bootstrap/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {!loading ? (
        <Fragment>
          <h1>Posts</h1>
          <p className="lead">Interact with the community.</p>
          <div className="text-dark pb-3">
            <PostForm />
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
