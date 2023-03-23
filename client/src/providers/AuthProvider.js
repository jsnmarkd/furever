import { createContext, useState, useContext } from 'react';

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext)
};

function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || null);

  // Perform login process for the user & save authID, etc
  // const login = function (email, password) {
  //   setAuth(true);
  //   setUser({});
  // };

  const register = function (id, username, email, firstName, lastName, password, passwordConfirmation) {
    setAuth(true);
    setUser({ id, username, email, firstName, lastName });
    localStorage.setItem("userData",JSON.stringify({ id, username, email, firstName, lastName }))
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  // authContext will show these items
  const userData = { auth, user, setUser, register, logout };

  // comonent to share context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}

export { AuthProvider, useAuthContext };