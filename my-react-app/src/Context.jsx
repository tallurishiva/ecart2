import React from "react";
export const Gc = React.createContext();
export const useGc = () => React.useContext(Gc);
export default function AppContext({ children }) {
  const [eid,seteid ] = React.useState("srk");
  const contextValue = {
    eid,seteid
  };
  return <Gc.Provider value={contextValue}>{children}</Gc.Provider>;
}
