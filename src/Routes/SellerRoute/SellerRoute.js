import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import useUserRole from '../../hooks/useUserRole';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [role, isLoadingRole] = useUserRole(user?.email)

    const location = useLocation()

    if (loading || isLoadingRole) {
        return <Loading />
    }
    if (user && role === 'Seller') {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace />;
};

export default SellerRoute;