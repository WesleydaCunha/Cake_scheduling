import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/axios'; // Ajuste o caminho conforme necessário

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    setIsChecking(false);
                    navigate('/');
                    return;
                }

                // Verifica o token com a API
                const response = await api.get('/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setIsChecking(false);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                    setIsChecking(false);
                    navigate('/');
                }
            } catch (error) {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
                setIsChecking(false);
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);



    return { isAuthenticated, isChecking };
}
