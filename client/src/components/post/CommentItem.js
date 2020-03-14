import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import { Link } from 'react-router';
import { deleteComment } from '../../actions/post';
import Button from 'react-bootstrap/Button';

const CommentItem = ({
  auth,
  postId,
  comment: { date, _id, text, name, avatar, user },
  deleteComment
}) => (
  <Media className="bg-light flex-column border rounded p-3 my-2 text-dark">
    <div className="d-flex ">
      <Image
        width={64}
        height={64}
        className="mr-3"
        src={avatar}
        alt="Profile"
      ></Image>
      <Media.Body>
        <h5 className="mb-0 pb-0">{name}</h5>
        <Moment format="MM/DD/YYYY" className="text-muted mt-0 mb-2 small">
          {date}
        </Moment>
        <p className="mb-1">{text}</p>
      </Media.Body>
    </div>

    {!auth.loading && user === auth.user._id && (
      <Fragment>
        <Button
          size="sm"
          variant="danger"
          onClick={() => deleteComment(postId, _id)}
        >
          Delete
        </Button>
      </Fragment>
    )}
  </Media>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
