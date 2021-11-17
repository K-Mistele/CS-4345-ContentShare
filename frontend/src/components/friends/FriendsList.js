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
import { FriendInvites } from "./FriendInvites"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

class FriendsList extends React.Component {

  constructor() {
    super();
    this.state = {
      friends: [],
      openAddFriendDialog: false,
      openFriendRequestsDialog: false
    }
  }

  componentDidMount() {
    this.setState({
      friends: friendData
    })
  }

  // -------- Functions for add friend --------
  CloseFriendRequestDialog() {
    this.setState({ openFriendRequestsDialog: false })
    // also reload window to save changes?
  }
  AddFriend(id) {
    // connect to backend
    // reload window
  }
  DeclineFriend(id) {
    // connect to backend
    // reload window
  }


  render() {

    return (
      <div className="changeLATER">
        <Header />
        <NavigationBar page="Friends" />
        <Container maxWidth="md">
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="right"
          >
            <Button onClick={() => { this.setState({ openAddFriendDialog: true }) }} color="primary" startIcon={<AddCircleOutlineIcon />}
              variant="text">Add a New Friend</Button>
            <Button onClick={() => { this.setState({ openFriendRequestsDialog: true }) }} color="primary" startIcon={<CircleNotificationsIcon />}
              variant="text">Friend Invites</Button>
            <FriendInvites open={this.state.openFriendRequestsDialog}
              CloseDialog={() => { this.CloseFriendRequestDialog() }}
              AddFriend={id => { this.AddFriend(id) }}
              DeclineFriend={id => { this.DeclineFriend(id) }} />
          </Stack>
          <Typography sx={{ fontSize: 20, mt: 4 }} color="text.primary" gutterBottom variant="h1">
            Friends
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Last Name </TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Handle&nbsp;</TableCell>
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
                    <TableCell align="right">
                      <Button href='/'>{friend.handle}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    )
  }
}

export default FriendsList;