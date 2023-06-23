import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export const ChildProtectionWrapper = ({ children }: { children: JSX.Element }) => {
    const userId = 1;
    let location = useLocation();
    // const user : any = JSON.parse(localStorage.getItem('auth'))

    if (!userId) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}