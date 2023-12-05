import { Col, Form, Row, Button } from 'react-bootstrap';
import { fetchCustom } from '../../utils/fetch';
import { useContext, useState } from 'react';
import { APIS, TOKEN_KEY } from '../../constans';
import queryString from 'query-string';
import Register from './Register';
import Login from './Login';
import { AppContext } from '../../hooks/useContext';
import { getLocalStorage } from '../../utils/localstorage';
import Dashboard from '../Dashboard';

const Author = () => {
  const token = getLocalStorage(TOKEN_KEY);

  return (
    <div>
      {token ? <Dashboard /> : <Login />}
    </div>
  );
};

export default Author;
