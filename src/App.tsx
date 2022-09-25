import React, { Suspense } from 'react';
import Routes from './routes';
import ReactNotification from 'react-notifications-component';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-notifications-component/dist/theme.css';
import './scss/style.scss';
import Loader from './components/Loader';
import AxiosConfiguration from './helpers/axiosConfiguration';

const App: React.FC = () => {
  AxiosConfiguration();
  return (
    <>
      <ReactNotification />
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </>
  );
};

export default App;
