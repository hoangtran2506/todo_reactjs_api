import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { TodoContext } from '../../hooks/useContext';
import { ACTIONS_TODO } from '../../hooks/useTodo';
import DeleteItem from './DeleteItem';
import { editTodo } from '../../utils/apiHandle';

const Item = ({ id, todo, setContentAlert }) => {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [newTitle, setNewTitle] = useState();
  const handleEdit = async () => {
    isDisabled && setIsDisabled(false);
    if (!isDisabled && newTitle) {
      const newTodos = todos;
      const res = await editTodo({
        id,
        formValue: {
          ...todo,
          title: newTitle,
        },
      });
      if (!res.status) {
        setContentAlert(res.errors[0]);
        return;
      }

      newTodos[id] = {
        ...todo,
        title: newTitle,
      };

      dispatch({
        type: ACTIONS_TODO.EDIT_ITEM,
        payload: newTodos,
      });
      setContentAlert('Add item success!!');
      setIsDisabled(true);
    }
  };

  const changeHandle = (e) => {
    setNewTitle(e.target.value);
  };

  useEffect(() => {
    todo && setNewTitle(todo.title);
  }, [todo]);

  return (
    <div className='m-b-10'>
      <InputGroup>
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username with two button addons"
          value={newTitle}
          disabled={isDisabled}
          onChange={changeHandle}
        />

        <Button variant='success' onClick={handleEdit}>
          <FontAwesomeIcon icon='fas fa-edit' style={{ color: '#ffffff' }} />
        </Button>
        <DeleteItem id={id} setContentAlert={setContentAlert} />
      </InputGroup>
    </div>
  );
};

export default Item;
