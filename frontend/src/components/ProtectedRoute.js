// ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth); // Assurez-vous que `state.auth` est correct

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />; // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    }

    return children;
};

export default ProtectedRoute;