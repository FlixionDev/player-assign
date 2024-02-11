import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { MyContext } from '../Context/Context';

export default function PrivateRoute({ children }) {
    const { isLogin, setisLogin, token, setToken } = useContext(MyContext);
    return (
        <div>
            {
                isLogin ? children : <Navigate to={`/login`} />
            }
        </div>
    )
}
