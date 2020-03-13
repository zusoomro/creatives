import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  return (
    <Fragment>
      {!profile || loading ? (
        <Spinner animation="border" />
      ) : (
        <Fragment>
          <Button as={Link} to="/profiles" variant="light">
            Back to Profiles
          </Button>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id && (
              <Button as={Link} to="/edit-profile" variant="light">
                Edit your profile
              </Button>
            )}
          Profile
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
