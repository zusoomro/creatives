import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    skills,
    year
  }
}) => {
  return (
    <Card bg="light" className="mt-3 p-3 text-dark">
      <div className="d-flex flex-row">
        <Image
          rounded
          width={96}
          height={96}
          className="m-1 mr-3"
          src={avatar}
          alt="Profile"
        />

        <div className="flex-grow-1">
          <h3 className="my-0">{name}</h3>
          <p className="my-0 mb-2 text-muted">{year}</p>
          <p className="lead">{skills.toString().replace(/,/g, ', ')}</p>
        </div>
      </div>
      <hr className="p-0 mt-0 mb-2" />
      <Link className="ml-2" to={`/profile/${_id}`}>
        View Profile
      </Link>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
