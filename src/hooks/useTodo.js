import { TOKEN_KEY } from '../constans';
import { register } from '../utils/apiHandle';
import { setLocalStorage } from '../utils/localstorage';

export const initialTodoState = {
  todos: {},
  todosArr: [],
};

export const ACTIONS_TODO = {
  INIT: 'INIT',
  ADD_ITEM: 'ADD_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  REMOVE_TODO_ITEM: 'REMOVE_TODO_ITEM',
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TODO.INIT: {
      const todoObj = action.payload.reduce((result, value) => {
        Object.assign(result, {[value.id]: value})
        return result;
      }, {});
      return {
        ...state,
        todosArr: action.payload,
        todos: todoObj,
      };
    }
    case ACTIONS_TODO.ADD_ITEM: 
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.id]: action.payload,
        },

        todosArr: [ action.payload, ...state.todosArr ],
      };
    case ACTIONS_TODO.EDIT_ITEM:
      return {
        ...state,
        todos: action.payload,
      };
    case ACTIONS_TODO.REMOVE_TODO_ITEM: {
      const newTodosObj = state.todos;
      delete newTodosObj[action.payload];
      
      return {
        ...state,
        todos: newTodosObj,
        todosArr: state.todosArr.filter(value => value.id !== action.payload)
      };
    }

    default:
      return state;
  }
};
