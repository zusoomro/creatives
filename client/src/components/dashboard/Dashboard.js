import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';

// Bootstrap Components
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && !profile ? (
    <Fragment>
      <Spinner animation="border" />
    </Fragment>
  ) : (
    <Fragment>
      <h1 className="mt-5">Dashboard</h1>
      <p>
        <i className="fas fa-user"></i> Welcome, {user ? user.name : null}
      </p>
      {profile != null ? (
        <Fragment>
          <Link to="/edit-profile">Edit your Profile</Link>
          <Button variant="danger" onClick={() => deleteAccount()}>
            Delete Your Account
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          You have not yet set up a profile. Please add some info.{' '}
          <Link to="/create-profile">Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
