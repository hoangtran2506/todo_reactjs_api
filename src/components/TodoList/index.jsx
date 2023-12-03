import { useReducer } from 'react';
import { TodoContext } from '../../hooks/useContext';
import { initialTodoState, todoReducer } from '../../hooks/useTodo';
import ListTodo from './ListTodo';

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <ListTodo />
    </TodoContext.Provider>
  );
};
export default TodoList;
