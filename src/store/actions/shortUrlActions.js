import axios from "axios";
import ApiUrl from '../../konfig/Api';

export const createShortUrl = url => dispatch => {
  axios
    .post(ApiUrl+"api/shorters", url)
    .then(res => {
      console.log(res);
      dispatch({ type: "SHORT_URL_SUCCESS", res });
    })
    .catch(err => {
      dispatch({ type: "SHORT_URL_ERROR", err });
    });
};
