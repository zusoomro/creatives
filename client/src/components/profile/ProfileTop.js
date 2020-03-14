import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';

const ProfileTop = ({
  profile: {
    year,
    user: { name, avatar },
    social
  }
}) => {
  return (
    <div className="border rounded mt-3 p-3 d-flex h-50 flex-column justify-content-center align-items-center bg-light text-dark ">
      <Image rounded src={avatar} alt="Profile" />
      <h2 className="mt-3">{name}</h2>
      <p>{year}</p>
      <div className="d-flex">
        {social && social.soundcloud && (
          <a href={social.soundcloud}>
            <i className="fab fa-soundcloud fa-2x ml-2"></i>
          </a>
        )}
        {social && social.imgur && (
          <a href={social.imgur}>
            <i className="far fa-image fa-2x ml-2"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram}>
            <i className="fab fa-instagram fa-2x ml-2"></i>
          </a>
        )}
        {social && social.github && (
          <a href={social.github}>
            <i className="fab fa-github fa-2x ml-2"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
