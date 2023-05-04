import React from "react";
import { GiveData } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = GiveData();
    if(!user) {
        return <Navigate to="/"/>
    }else{
        return children;
    }
};

export default ProtectedRoute;