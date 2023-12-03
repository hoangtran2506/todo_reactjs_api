import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useReducer } from 'react';
import { AppContext } from './hooks/useContext';
import { appReducer, initialAppState } from './hooks/useApp';

library.add(fas)


function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <div className="App">
      <AppContext.Provider value={{state, dispatch}} >
      <div className="app-wraper p-20">
        <RouterProvider router={router} />
      </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
