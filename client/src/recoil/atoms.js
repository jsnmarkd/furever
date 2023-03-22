import { atom, useRecoilState } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    auth: false,
    user: null,
  },
});

export function useAuth() {
  const [user, setUser] = useRecoilState(userState);

  const login = function (username, email, firstName, lastName) {
    setUser({
      auth: true,
      user: { username, email, firstName, lastName, user_profile_picture },
    });
  };

  const register = function (username, email, firstName, lastName, password, passwordConfirmation) {
    setUser({
      auth: true,
      user: { username, email, firstName, lastName, user_profile_picture },
    });
  };

  const logout = function () {
    setUser({
      auth: false,
      user: null,
    });
  };

  return { ...user, register, login, logout };
}
