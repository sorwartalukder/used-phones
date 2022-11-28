import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const SellerRoute = ({ children }) => {
    const { user, loading, loadingUser, userRole } = useContext(AuthContext)
    const location = useLocation()
    if (loading || loadingUser) {
        return <Loading />
    }
    if (user && userRole === 'Buyer') {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace />;
};

export default SellerRoute;