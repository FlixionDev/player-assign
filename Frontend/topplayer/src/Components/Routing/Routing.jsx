import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../Login/Login'
import SignUp from '../Signup/Signup'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import SigninPrivateRoute from '../PrivateRoute/SigninPrivateRoute'
import Navbar from '../Navbar/Navbar'
import Topplayer from '../Topplayer/Topplayer'
import PlayerRating from '../PlayerRating/PlayerRating'

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Navbar/><Topplayer /></PrivateRoute>} />
        <Route path='/rating/:username' element={<PrivateRoute><Navbar/><PlayerRating/></PrivateRoute>} />
        <Route path='/login' element={<SigninPrivateRoute><SignIn /></SigninPrivateRoute>} />
        <Route path='/signup' element={<SigninPrivateRoute><SignUp /></SigninPrivateRoute>} />
        <Route path='*' element={<h1 style={{textAlign:"center",color:"red",fontSize:"30px",fontWeight:"bolder"}}>404, Page not found</h1>}/>
      </Routes>
    </div>
  )
}
