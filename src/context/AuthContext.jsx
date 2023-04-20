import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export function GiveData() {
    return useContext(AuthContext);
}