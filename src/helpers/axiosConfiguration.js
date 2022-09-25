import axios from 'axios';
import { store } from 'react-notifications-component';

let axiosInterceptor = null;
let axiosRequestInterceptor = null;
const AxiosConfiguration = () => {
  let currentLocale = localStorage.getItem('currentLocale') ?? 'en';

  axios.defaults.headers.common['X-Locale'] = currentLocale;
  let counter = 0;
  if (!!axiosInterceptor || axiosInterceptor === 0) {
    axios.interceptors.response.eject(axiosInterceptor);
  }

  if (!!axiosRequestInterceptor || axiosRequestInterceptor === 0) {
    axios.interceptors.request.eject(axiosRequestInterceptor);
  }
  axiosRequestInterceptor = axios.interceptors.request.use(
    (request) => {
      counter++;
      return request;
    },
    (error) => {
      counter--;
      console.log('Request Error ', error);
    }
  );

  axiosInterceptor = axios.interceptors.response.use(
    (response) => {
      counter--;
      return response;
    },

    (error) => {
      counter--;
      // Show Alert FOr Error
      if (error.response && error.response.status === 400) {
        store.addNotification({
          title: 'Something Went Wrong!',
          message: error.response.data.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      } else if (error.response && error.response.status === 401) {
        store.addNotification({
          title: 'Unauthenticated!',
          message: 'Go Back to Login',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('currentLocale');
        window.location.href = '/auth/login';
      } else if (error.response && error.response.status === 422) {
        let errorsMsgs = ``;
        Object.values(error.response.data.errors).map(
          (msg) => (errorsMsgs += msg + '\n')
        );
        store.addNotification({
          title: error.response.data.message,
          message: errorsMsgs,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      } else if (error.response && error.response.status === 500) {
        store.addNotification({
          title: 'Something Went Wrong!',
          message: 'Internal Server Error, Please try again later',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      } else if (error.response && error.response.status === 404) {
        store.addNotification({
          title: 'Something Went Wrong!',
          message: 'Page not found 404',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      }
      return Promise.reject(error);
    }
  );
};

export default AxiosConfiguration;
