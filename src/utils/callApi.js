import axios from "axios";

const callApi = (
  url,
  method = "GET",
  body = null,
  header = "application/json"
) => {
  return axios({
    url: url,
    method: method,
    data: body ? body : null,
    header: header,
  })
};

export default callApi;
