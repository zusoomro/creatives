import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';

// Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// withRouter and history are essential to being able to redirect within the
// action function
const EditProfile = ({
  createProfile,
  getCurrentProfile,
  history,
  profile: { profile, loading }
}) => {
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

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      year: loading || !profile.year ? '' : profile.year,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      soundcloud: loading || !profile.social ? '' : profile.soundcloud,
      imgur: loading || !profile.social ? '' : profile.imgur,
      instagram: loading || !profile.social ? '' : profile.instagram,
      github: loading || !profile.social ? '' : profile.github
    });
  }, [getCurrentProfile]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Fragment>
          <Form onSubmit={e => onSubmit(e)}>
            <h1>Edit Profile</h1>

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
        </Fragment>
      )}
    </Fragment>
  );
};

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
