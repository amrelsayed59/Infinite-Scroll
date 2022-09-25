import React from 'react';
import MainLayout from './MainLayout';
import { Route } from 'react-router-dom';

const PublicRoute: React.FC<any> = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(matchProps) => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

export default PublicRoute;
