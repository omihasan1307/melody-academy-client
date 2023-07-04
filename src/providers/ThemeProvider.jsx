import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const mainHTML = document.getElementsByTagName("html")[0];
    if (theme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      mainHTML.setAttribute("data-theme", "dark");
      mainHTML.setAttribute("class", "dark");
    } else {
      mainHTML.setAttribute("data-theme", "light");
      mainHTML.setAttribute("class", "light");
    }
  }, [theme]);
  return (
    <MyContext.Provider value={{ theme, setTheme }}>
      {children}
    </MyContext.Provider>
  );
};

export default ThemeProvider;
