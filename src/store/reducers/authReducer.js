import isEmpty from "../../validation/is-empty";

const initState = {
  authError: null,
  isAuthenticated: false,
  user: {},
  registerStatus : false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed"
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case "REGISTER_SUCCESS":
      console.log("register success");
      return {
        ...state,
        authError: null,
        registerStatus: true
      };

    case "REGISTER_ERROR":
      return {
        ...state,
        authError: action.err.response.data
      };

    default:
      return state;
  }
};

export default authReducer;
