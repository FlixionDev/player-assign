import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { MyContext } from '../Context/Context';


export default function SigninPrivateRoute({children}) {
    const { isLogin, setisLogin, token, setToken } = useContext(MyContext);
  return (
    <div>
        {
            isLogin===false ? children : <Navigate to={`/`}/>
        }
    </div>
  )
}
