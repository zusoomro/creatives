import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => {
  return (
    <Card bg="light" className="mt-3 p-3 text-dark">
      <div className="d-flex flex-row">
        <Image
          width={64}
          height={64}
          className="mr-3"
          src={avatar}
          alt="Generic placeholder"
        ></Image>

        <div className="flex-grow-1">
          <h5 className="mb-0 pb-0">{name}</h5>
          <Moment format="MM/DD/YYYY" className="text-muted mt-0 mb-2 small">
            {date}
          </Moment>
          <p className="mb-1">{text}</p>
        </div>
      </div>

      {showActions && (
        <Fragment>
          <hr className="p-0 my-2" />
          <div className="d-flex">
            <Button size="sm" onClick={() => addLike(_id)} className="mr-2">
              <i className="far fa-thumbs-up"></i> Like{' '}
              {likes.length > 0 && `(${likes.length})`}
            </Button>
            <Button size="sm" onClick={() => removeLike(_id)} className="mr-2">
              Unlike
            </Button>
            <Button
              size="sm"
              as={Link}
              to={`/posts/${_id}`}
              variant="secondary"
              className="mr-2"
            >
              <i className="fas fa-comments"></i>{' '}
              <span className="d-none d-md-inline">Discussion </span>
              {comments.length > 0 && `(${comments.length})`}
            </Button>
            {!auth.loading && user === auth.user._id && (
              <Button
                size="sm"
                onClick={() => deletePost(_id)}
                variant="danger"
              >
                Delete
              </Button>
            )}
          </div>
        </Fragment>
      )}
    </Card>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
