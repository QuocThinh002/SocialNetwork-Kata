import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      'Content-Type': 'application/json'
    }
})


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // gan token vao header
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // refresh token

    return response;
  }, function (error) {
    if (401 === error.response.status) {
      console.log('ok')
  } else {
      return Promise.reject(error);
  }
    return Promise.reject(error);
  });

export default instance