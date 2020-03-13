import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOADING_RESOURCES
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  // all profiles in the database
  profiles: [],
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // Clear the profile
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    case LOADING_RESOURCES:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    default:
      return state;
  }
}
