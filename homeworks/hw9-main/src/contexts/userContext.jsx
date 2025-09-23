import { createContext } from "react";

const userContext = createContext({
  isLoggedIn: false,
  isGuest: false,
  username: null,
  setIsLoggedIn: () => {},
  setIsGuest: () => {},
  setUsername: () => {}
});

export default userContext;