//
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = {
    isAuthenticated: true,
  };

  if (!context) throw new Error("Auth context must be use inside AuthProvider");

  return context;
};

export default useAuth;
