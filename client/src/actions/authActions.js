import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING }); // User loading
    const res = await axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });
    const res = await axios.post("/api/auth/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout user
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  return true;
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
