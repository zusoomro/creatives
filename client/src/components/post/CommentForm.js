import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
      className="mb-4 mt-2 p-3 bg-light border rounded"
    >
      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment"
          onChange={e => setText(e.target.value)}
          value={text}
        ></Form.Control>
      </Form.Group>
      <Button size="sm" variant="primary" type="submit">
        Comment
      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
