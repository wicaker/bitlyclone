import axios from "axios";

export const createShortUrl = url => dispatch => {
  axios
    .post("http://localhost:5000/api/shorters", url)
    .then(res => {
      console.log(res);
      dispatch({ type: "SHORT_URL_SUCCESS", res });
    })
    .catch(err => {
      dispatch({ type: "SHORT_URL_ERROR", err });
    });
};
