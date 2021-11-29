import React from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NavigationBar from "../NavigationBar/NavigationBar"
import Header from "../Header/Header"
import Container from '@mui/material/Container';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import friendData from "../../temp_data/friendData"
import { FriendInvites } from "./FriendRequest"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Redirect } from 'react-router-dom';

// import { friendRepo } from "../../api/friendRepo" 

class FriendsList extends React.Component {

  // friendRepository = new friendRepo();

  constructor(props) {
    super(props);
    this.state = {
      // friends: [],
      openAddFriendDialog: false,
      openFriendRequestsDialog: false
    }
  }

  componentDidMount() {
    
  }


  handleClick(frienduuid) {
    console.log(frienduuid)
    this.setState({redirect:`/friend/movies/`+frienduuid})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div className="changeLATER">
        <Typography sx={{ fontSize: 20, mt: 4 }} color="text.primary" gutterBottom variant="h1">
          Friends
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table" >
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 600 }}> </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.friends.map((friend) => (
                <TableRow
                  key={friend.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover onClick={() => this.handleClick(friend.uuid)} style={{cursor: 'pointer'}}
                >
                  <TableCell component="th" scope="row">
                    <Avatar alt="Remy Sharp" src={friend.profileUrl} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {friend.username}
                  </TableCell>
                  <TableCell>{friend.fullName}</TableCell>
                  <TableCell>
                    {friend.email}
                  </TableCell>
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