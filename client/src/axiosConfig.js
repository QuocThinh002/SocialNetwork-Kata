import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  },
  withCredentials: true  // Kích hoạt gửi cookie
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // gan token vao header
  // Cập nhật lại token từ LocalStorage vào mỗi request
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // refresh token

  return response;
}, function (error) {
  if (error.response && error.response.status === 401) {
    console.log('Access token đã hết hạn. Xóa token và điều hướng đến trang đăng nhập.');

    // Xóa accessToken khỏi LocalStorage
    localStorage.removeItem('accessToken');

    // Điều hướng người dùng đến trang đăng nhập (nếu cần)
    window.location.href = '/login';
  } else {
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default instance