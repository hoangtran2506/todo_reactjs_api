import { useNavigate } from 'react-router-dom';
import Item from './Item';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { removeLocalStorage } from '../../utils/localstorage';
import { TOKEN_KEY } from '../../constans';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AppContext, TodoContext } from '../../hooks/useContext';
import { ACTIONS_TODO } from '../../hooks/useTodo';
import AddForm from './AddForm';
import { getAllTodo } from '../../utils/apiHandle';

const ListTodo = () => {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);
  const { state: { user } } = useContext(AppContext);
  const navigate = useNavigate();
  const [contentAlert, setContentAlert] = useState('');

  const logoutHandle = () => {
    dispatch({
      type: ACTIONS_TODO.AUTHOR,
      payload: null,
    });
    removeLocalStorage(TOKEN_KEY);
    navigate('/login');
  };

  useEffect(() => {
    if (contentAlert) {
      setTimeout(() => {
        setContentAlert('');
      }, 2000);
    }
  }, [contentAlert]);

  useLayoutEffect(() => {
    const getTodos =  () => {
      dispatch({
        type: ACTIONS_TODO.INIT,
        payload: user.books
      })
    }

    user && user.books && getTodos();
  }, [dispatch, user])


  return (
    <div>
      {contentAlert && (
        <Alert variant={'success'} id='alert'>
          {contentAlert}
        </Alert>
      )}

      <div className='flex flex-end m-b-20'>
        <span className='pointer' onClick={logoutHandle}>
          Logout
        </span>
      </div>
      <AddForm />

      {Object.entries(todos).map(([key, todo]) => (
        <Item
          key={key}
          todo={todo}
          id={key}
          setContentAlert={setContentAlert}
        />
      ))}
    </div>
  );
};

export default ListTodo;