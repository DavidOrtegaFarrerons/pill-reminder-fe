import React from 'react';
import useAuthCheck from "@/hooks/useAuthCheck";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuthCheck();

    if (isAuthenticated === null) {
        return ( <div>Loading...</div> );
    }

    if (!isAuthenticated) {
        return ( <Navigate to="/login" replace /> );
    }

    return children;
}