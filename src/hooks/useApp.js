import { TOKEN_KEY } from '../constans';
import { register } from '../utils/apiHandle';
import { setLocalStorage } from '../utils/localstorage';

export const initialAppState = {
  user: null,
};


export const ACTIONS_AUTHOR = {
  AUTHOR: "AUTHOR",
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_AUTHOR.AUTHOR: {

      return {
        ...state,
        user: action.payload
      };
    }
    case ACTIONS_AUTHOR.ADD_ITEM:
      return {
        ...state,
        todos: { ...action.payload, ...state.todos}
      }
    case ACTIONS_AUTHOR.EDIT_ITEM:
      return {
        ...state,
        todos: action.payload
      }
    case ACTIONS_AUTHOR.REMOVE_TODO_ITEM:
      return {
        ...state,
        todos: {
          ...action.payload
        }
      }
  
    default:
        return state;
  }
}