import {async_keys, getData} from '../storage/UserPreference';

// Base URL
export const BASE_URL = 'https://staging.premad.in/mighal/api/';

// Methods
export const makeRequest = async (api, params = null, post = false) => {
  const token = await getData(async_keys.auth_token);
  const url = `${BASE_URL}${api}`;
  // console.log(token);

  try {
    // request info
    let requestOptions = {};

    if (post) {
      // request method type
      requestOptions.method = 'POST';

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      // Preparing multipart/form-data
      if (params) {
        const formData = new FormData();
        for (const key in params) {
          formData.append(key, params[key]);
        }
        requestOptions.body = formData;
      }

      // request body
      requestOptions.headers = myHeaders;
    } else {
      // headers to prevent cache in GET request
      requestOptions.headers = {
        // 'Cache-Control': 'no-cache, no-store, must-revalidate',
        // Pragma: 'no-cache',
        // Expires: 0,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
    }
    const response = await fetch(url, requestOptions);
    const result = await response.json();

    console.log('API-INFO', {url, requestOptions, response, result});

    return result;
  } catch (error) {
    console.log(error.message);
  }
};
