const initState = {
  urlShort: ""
};

const shortUrlReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHORT_URL_SUCCESS":
      console.log("success");
      return {
        ...state,
        urlShort: action.res.data.shortUrl
      };
    case "SHORT_URL_ERROR":
      console.log("short url error");
      return state;
    default:
      return state;
  }
};

export default shortUrlReducer;
