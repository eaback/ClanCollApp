import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IAuthRouteProps {children: ReactNode;}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            }else {
                console.log("unauthorized user");
                navigate("/git-ClanCollApp/login");
            }
        });

        return () => AuthCheck();
    }, [auth]);

    if (loading) return <p>loading...</p>;
    //todo: create loading animation
    
    return <>{children}</>
};

export default AuthRoute;