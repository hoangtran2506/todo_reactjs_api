import { useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { TodoContext } from '../../hooks/useContext';
import { ACTIONS_TODO } from '../../hooks/useTodo';
import { addTodo } from '../../utils/apiHandle';

const AddForm = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const res = await addTodo({
      formValue: {
        title,
      },
    });

    dispatch({
      type: ACTIONS_TODO.ADD_ITEM,
      payload: res.data,
    });
    setTitle('');
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Form onSubmit={handleAddItem}>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder='Title'
          aria-label='Title'
          aria-describedby='basic-addon2'
          value={title}
          onChange={handleChange}
          autoFocus
        />
        <Button
          disabled={title ? false : true}
          variant='primary'
          id='button-addon2'
          type='submit'
        >
          Add
        </Button>
      </InputGroup>
    </Form>
  );
};

export default AddForm;
