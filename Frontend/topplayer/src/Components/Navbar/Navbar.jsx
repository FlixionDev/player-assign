import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../Context/Context'
import { Button, Grid } from '@mui/material';

export default function Navbar() {
    const {isLogin,setisLogin,token,setToken} =useContext(MyContext);
    const nav=useNavigate()
    const handleClick=()=>{
        localStorage.removeItem("isLogin");
        localStorage.removeItem("token");
        setisLogin(false);
        setToken(null);
        alert(`Logout! successfull`)
        nav("/")
    }
  return (
    <Grid bgcolor={'black'} sx={{display:'flex',justifyContent:"space-between",alignItems:"center",fontSize:"18px",fontFamily:"sans-serif"}} p={1} >
        <Link style={{color:"white",textDecoration:"none"}} to='/'><Button variant="outlined" sx={{color:'white'}}>Top Players</Button></Link>
        {
            isLogin ? <Button variant="outlined" sx={{color:'white'}} onClick={handleClick}>Sign out</Button> : 
            //  <Link to={"/login"}><Button variant="outlined">Sign in</Button></Link>
            ""
        }
    </Grid>
  )
}
