import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Card from 'react-bootstrap/Card';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    skills,
    year
  }
}) => {
  return (
    <Card bg="light" className="flex-row my-3 p-3">
      <img
        width={64}
        height={64}
        className="m-1 mr-3"
        src={avatar}
        alt="Profile"
      />
      <Media.Body>
        <h5>{name}</h5>
        <p>{year}</p>

        <Link to={`/profile/${_id}`}> View Profile </Link>
        <p>{skills.toString()}</p>
      </Media.Body>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
