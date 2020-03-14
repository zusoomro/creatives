import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';

// Bootstrap Components
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
      <h1>Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome, {user ? user.name : null}
      </p>
      {profile != null ? (
        <div className="d-flex flex-column flex-sm-row align-items-sm-center ">
          <Button className="mt-2" as={Link} to={`/profile/${user._id}`}>
            View your profile
          </Button>
          <Button as={Link} className="ml-sm-3 mt-2" to="/edit-profile">
            Edit your profile
          </Button>
          <Button
            variant="danger"
            className="ml-sm-3 mt-2"
            onClick={() => deleteAccount()}
          >
            Delete your account
          </Button>
        </div>
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
