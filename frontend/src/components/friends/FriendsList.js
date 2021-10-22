import React from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import NavigationBar from "../NavigationBar/NavigationBar"
import Header from "../../Header"

import friendData from "../../temp_data/friendData"

class FriendsList extends React.Component{

    constructor(){
        super();
        this.state = {
            friends: []
        }
    }

    componentDidMount(){
        this.setState({
            friends: friendData
        })
    }

    render(){

        return (
            <div className = "changeLATER">
            <Header/> 
            <NavigationBar page = "Friends"/> 
            <Typography sx={{ fontSize: 20, mt:4 }} color="text.primary" gutterBottom variant = "h1">
                        Friends
                    </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell sx = {{ fontWeight: 600 }}>First Name</TableCell>
                        <TableCell sx = {{ fontWeight: 600 }} align="right">Last Name </TableCell>
                        <TableCell sx = {{ fontWeight: 600 }} align="right">Handle&nbsp;</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.friends.map((friend) => (
                        <TableRow
                        key={friend.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {friend.firstName}
                        </TableCell>
                        <TableCell align="right">{friend.lastName}</TableCell>
                        <TableCell align="right">{friend.handle}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
    </TableContainer>
            </div>
        )
    }
}

export default FriendsList; 