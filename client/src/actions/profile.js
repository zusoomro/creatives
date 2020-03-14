import axios from 'axios';
import { setAlert } from '../actions/alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  LOADING_RESOURCES
} from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: LOADING_RESOURCES });
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profiles/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Get all user profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: LOADING_RESOURCES });

  try {
    const res = await axios.get('/api/profiles');

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Get user profile by id
export const getProfileById = id => async dispatch => {
  dispatch({ type: LOADING_RESOURCES });
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(`/api/profiles/user/${id}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Create or update a profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  console.log('createProfile front-end action Called');

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log(formData);

    const res = await axios.post('/api/profiles', formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      // redirect outside of a component requires the history object
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status }
    });
  }
};

// Delete profile and account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone')) {
    try {
      await axios.delete('/api/profiles');

      dispatch({
        type: CLEAR_PROFILE
      });

      dispatch({
        type: ACCOUNT_DELETED
      });

      dispatch(setAlert('Your account has been permanently deleted.'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
