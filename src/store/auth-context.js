import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,

  //IDE로 자동완성하기 위해 더미함수를 추가한다.
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const storedUserLoggedInImformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInImformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  //의존성이 없으므로 처음 랜더링 한 후에 한번더 실행되고나서는 변한게 없으므로 다시 랜더링되지 않는다.

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
