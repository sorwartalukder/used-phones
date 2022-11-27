import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import useUserRole from '../../hooks/useUserRole';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [userRole, userRoleLoading] = useUserRole(user?.email)
    const location = useLocation()
    if (loading || userRoleLoading) {
        return <Loading />
    }
    if (user && userRole === 'Seller') {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace />;
};

export default SellerRoute;