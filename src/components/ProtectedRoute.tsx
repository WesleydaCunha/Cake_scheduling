import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; // Ajuste o caminho conforme necessário

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};


