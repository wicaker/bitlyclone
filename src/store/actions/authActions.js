import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import ApiUrl from '../../konfig/Api';

export const registerUser = newUser => dispatch => {
  axios
    .post(ApiUrl+"api/users/register", newUser)
    .then(res => console.log(res))
    .then(res => {
      dispatch({ type: "REGISTER_SUCCESS" });
    })
    .catch(err => {
      dispatch({ type: "REGISTER_ERROR", err });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post(ApiUrl+"api/users/login", userData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;
      // Set token to localstorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user;
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({ type: "LOGIN_ERROR", err });
    });
};

//Set login user
export const setCurrentUser = decoded => {
  return {
    type: "LOGIN_SUCCESS",
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
