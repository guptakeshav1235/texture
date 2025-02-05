import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();
    return auth && auth.user ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;