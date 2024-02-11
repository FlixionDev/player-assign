import React, { useState } from 'react' 
import { createContext } from 'react'
export const MyContext = createContext({ isLogin: localStorage.getItem("isLogin") || false, token: localStorage.getItem("token") || null });
export default function Context(props) {
    const [isLogin, setisLogin] = useState( localStorage.getItem("isLogin") || false )
    const [token, setToken] = useState( localStorage.getItem("token") || null )
    return (
        <MyContext.Provider value={{ isLogin, setisLogin, token, setToken }}>
            {props.children}
        </MyContext.Provider>
    )
}
