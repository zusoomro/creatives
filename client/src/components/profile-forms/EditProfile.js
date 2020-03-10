import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Style from '../css/Style';
import { createProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

// withRouter and history are essential to being able to redirect within the
// action function
const EditProfile = ({ createProfile, getCurrentProfile, history }) => {
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
    <div>
      <Style.container>
        <Style.Form onSubmit={e => onSubmit(e)}>
          <h1>Register</h1>
          <p> Heyo, register here! </p>

          <Style.Label>Year</Style.Label>
          <Style.Input
            name="year"
            type="text"
            value={year}
            onChange={e => onChange(e)}
          />

          <Style.Label>Skills</Style.Label>
          <Style.Input
            name="skills"
            type="text"
            value={skills}
            onChange={e => onChange(e)}
          />

          <Style.Label>Bio</Style.Label>
          <Style.Input
            name="bio"
            type="text"
            value={bio}
            onChange={e => onChange(e)}
          />

          <Style.Label>Soundcloud</Style.Label>
          <Style.Input
            name="soundcloud"
            type="text"
            value={soundcloud}
            onChange={e => onChange(e)}
          />

          <Style.Label>Imgur</Style.Label>
          <Style.Input
            name="imgur"
            type="text"
            value={imgur}
            onChange={e => onChange(e)}
          />

          <Style.Label>Instagram</Style.Label>
          <Style.Input
            name="instagram"
            type="text"
            value={instagram}
            onChange={e => onChange(e)}
          />

          <Style.Label>Github</Style.Label>
          <Style.Input
            name="github"
            type="text"
            value={github}
            onChange={e => onChange(e)}
          />

          <input type="submit" value="Submit"></input>
        </Style.Form>
      </Style.container>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile, withRouter, getCurrentProfile })(
  EditProfile
);
