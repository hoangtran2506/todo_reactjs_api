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
    state: { todosArr },
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
        payload: user.books.reverse()
      })
    }

    user && user.books && getTodos();
  }, [dispatch, user])

  return (
    <div className='todo_container'>
      
      {contentAlert && (
        <Alert variant={'success'} id='alert'>
          {contentAlert}
        </Alert>
      )}

      <div className='flex flex-space-between m-b-10'>
      <div className='flex m-b-20'>
        <h3>Todo list</h3>
      </div>
        <span className='pointer' onClick={logoutHandle}>
          Logout
        </span>
      </div>
      <AddForm />

      <div className='todo-list_container'>

      {todosArr.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          id={todo.id}
          setContentAlert={setContentAlert}
        />
      ))}
      </div>
    </div>
  );
};

export default ListTodo;
