import { createContext, useState, useContext } from 'react';


const authContext = createContext();

function useAuthContext() {
  return useContext(authContext)
};

function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  // Perform login process for the user & save authID, etc
  const login = function (user) {
    setAuth(true);
    setUser(user);
    console.log('set user',user)
  };

  const register = function (username, email, first_name, last_name, password, passwordConfirmation) {
    setAuth(true);
    setUser({ username, email, first_name, last_name });
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  // authContext will show these items
  const userData = { auth, user, register, logout, login };

  // comonent to share context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}

export { AuthProvider, useAuthContext };