import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  console.log(skills);
  return (
    <div className="text-dark bg-light border rounded mt-3 p-3">
      {bio && (
        <Fragment>
          <h3>{name.trim().split(' ')[0]}'s Bio</h3>
          <p className="lead">{bio}</p>
          <br />
        </Fragment>
      )}

      {skills && (
        <Fragment>
          <h3>{name.trim().split(' ')[0]}'s Skills</h3>
          <ListGroup>
            {skills.map((skill, index) => (
              <ListGroup.Item key={index}>{skill}</ListGroup.Item>
            ))}
          </ListGroup>
        </Fragment>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
