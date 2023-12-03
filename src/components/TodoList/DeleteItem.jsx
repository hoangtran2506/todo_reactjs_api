import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup } from 'react-bootstrap';
import { TodoContext } from '../../hooks/useContext';
import { useContext, useState } from 'react';
import { removeTodo } from '../../utils/apiHandle';
import { ACTIONS_TODO } from '../../hooks/useTodo';

const DeleteItem = ({ id, setContentAlert }) => {
  const [showDelete, setShowDelete] = useState(false);
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoContext);

  const handleRemove = async (e) => {
    e.stopPropagation();
    const newTodos = todos;
    const res = await removeTodo({ id: id });
    if (!res.status) {
      setContentAlert(res.errors[0]);
      return;
    }
    setContentAlert('Remove item success!!');

    delete newTodos[id];
    dispatch({
      type: ACTIONS_TODO.REMOVE_TODO_ITEM,
      payload: newTodos,
    });
  };

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  return (
    <Button variant='danger' onClick={handleShowDelete}>
      <FontAwesomeIcon
        icon='fa-solid fa-trash-can'
        style={{ color: '#ffffff' }}
      />
      {showDelete && (
        <div className='confirm_delete'>
          <div className='confirm_delete_container p-10'>
            <p>Do you really want to remove?</p>
            <ButtonGroup className='me-2' aria-label='Second group'>
              <Button onClick={() => setShowDelete(false)}>Cancel</Button>
              <Button variant='outline-secondary' onClick={handleRemove}>
                Submit
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </Button>
  );
};

export default DeleteItem;
