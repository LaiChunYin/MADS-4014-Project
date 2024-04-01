import { useEffect, useState, useContext, createContext } from 'react';

export const NavigationOptionsContext = createContext()
export const NavigationOptionsProvider = ({ children }) => {
//   const [options, setOptions] = useState({});
  const [tabSetOptions, setTabSetOptions] = useState(() => () => {console.log("setting tab")});
  return (
    <NavigationOptionsContext.Provider value={{ tabSetOptions, setTabSetOptions }}>
      {children}
    </NavigationOptionsContext.Provider>
  );
};