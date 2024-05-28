import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const RequireAuth = ({ element }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    return  auth ? element : navigate('/');
}
 
export default RequireAuth;
