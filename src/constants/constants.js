const KEY = "AIzaSyCIbmsVj-c-2vKyJkqtjsSXgnGg8T2S_ng";
export const AUTH_URL = (action) =>
  `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${KEY}`;
