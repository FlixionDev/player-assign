import { Button, Typography } from '@mui/material';
import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { red } from '@mui/material/colors';

export default function PlayerRating() {
    const {username}=useParams();
    const [state,setState]=useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch(`https://reachhub1.onrender.com/player/${username}/rating-history`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => res.json()).then((res) => {
            setState(res)
            console.log(res)
        }).catch(err => console.log(err));
    }
    const handleClick = () => {
      fetch(`https://reachhub1.onrender.com/players/${username}/rating-history-csv`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filename.csv'); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
  return (
    <Grid container>
    {
        state.length > 0 
        ? 
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead><TableRow>
          <StyledTableCell align="center">Player username </StyledTableCell>
            <StyledTableCell align="center">{username}</StyledTableCell>
            <StyledTableCell align='center'><Button onClick={handleClick}>Download CSV</Button></StyledTableCell>
          </TableRow>
          <TableRow>
          <StyledTableCell align="center">No. </StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align='center'>Point</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            state.length >0 ? 
            state.map((el,ind)=>{
                return <StyledTableRow key={ind+1} >
                <StyledTableCell align="center">{ind+1}</StyledTableCell>
                <StyledTableCell align="center">{`${el[2]}/${el[1]}/${el[0]}`}</StyledTableCell>
                <StyledTableCell component="th" align='center' scope="row">
                {el[3]}
                </StyledTableCell>
                {/* <StyledTableCell align="center">{el.perfs.classical.rating}</StyledTableCell>
                <StyledTableCell align="center"><Link to={`/rating/${el.username}`}>Click</Link></StyledTableCell> */}
              </StyledTableRow>
            })
            : ""
          }
            
        </TableBody>
      </Table>
    </TableContainer>
        : <Typography variant='h1' fontSize={22} color={'red'} m={'auto'} p={2}>{`There is no data of ${username} player for last 30 days`}</Typography>
    }
        
    </Grid>
  )
}
