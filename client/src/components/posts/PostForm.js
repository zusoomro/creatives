import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        addPost({ text });
        setText('');
      }}
      className="bg-light p-3 rounded"
    >
      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="What's on your mind?"
          onChange={e => setText(e.target.value)}
          value={text}
        ></Form.Control>
      </Form.Group>
      <Button size="sm" variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
