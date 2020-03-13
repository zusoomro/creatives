import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// withRouter and history are essential to being able to redirect within the
// action function
const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    year: '',
    skills: '',
    bio: '',
    soundcloud: '',
    imgur: '',
    instagram: '',
    github: ''
  });

  const { year, skills, bio, soundcloud, imgur, instagram, github } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <React.Fragment>
      <Form onSubmit={e => onSubmit(e)}>
        <h1>Create a Profile</h1>

        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control
            name="year"
            type="text"
            value={year}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Skills</Form.Label>
          <Form.Control
            name="skills"
            type="text"
            value={skills}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            name="bio"
            type="text"
            value={bio}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Soundcloud</Form.Label>
          <Form.Control
            name="soundcloud"
            type="text"
            value={soundcloud}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Imgur</Form.Label>
          <Form.Control
            name="imgur"
            type="text"
            value={imgur}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            name="instagram"
            type="text"
            value={instagram}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Github</Form.Label>
          <Form.Control
            name="github"
            type="text"
            value={github}
            onChange={e => onChange(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
