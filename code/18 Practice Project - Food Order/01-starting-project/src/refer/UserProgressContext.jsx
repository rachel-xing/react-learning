import {createContext, useContext, useState} from "react";

const UserProgressContext = createContext();

function UserProgressContextProvider({children}) {
  const [progress, setProgress] = useState("");

  const value = {
    progress,
    showCart: () => setProgress("cart"),
    hideCart: () => setProgress(""),
    showCheckout: () => setProgress("checkout"),
    hideCheckout: () => setProgress("")
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
}
