// src/components/ProtectedRoute.js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Verifica se o token está no localStorage

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
