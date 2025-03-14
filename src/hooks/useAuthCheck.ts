import axios from "axios";
import {useEffect, useState} from "react";

function useAuthCheck() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/check-auth', {
                });

                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.error('Authentication check failed:', error);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, user };
}

export default useAuthCheck;