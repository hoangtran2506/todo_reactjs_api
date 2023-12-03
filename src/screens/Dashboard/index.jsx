import { useContext, useEffect, useState } from 'react';
import TodoList from '../../components/TodoList';
import Author from '../Authori';
import './index.css';
import {  AppContext } from '../../hooks/useContext';
import { getLocalStorage } from '../../utils/localstorage';
import { TOKEN_KEY } from '../../constans';
import { useNavigate } from 'react-router-dom';
import { getAllTodo, getProfile } from '../../utils/apiHandle';
import { Alert } from 'react-bootstrap';
import { ACTIONS_AUTHOR } from '../../hooks/useApp';

const Dashboard = ({}) => {
  const { state, dispatch } = useContext(AppContext);
  const [contentAlert, setContentAlert] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorage(TOKEN_KEY);
    if (token) {
      const getUser = async () => {

        const res = await getProfile(token);
        if (!res.status) {
          setContentAlert(res.errors[0]);
          return;
        }
        dispatch({
          type: ACTIONS_AUTHOR.AUTHOR,
          payload: {
            ...res.data,
            token,
          },
        });
      };
      getUser();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <TodoList />
      {contentAlert && (
        <Alert variant={'danger'} id='alert'>
          {contentAlert}
        </Alert>
      )}
    </div>
  );
};

export default Dashboard;
