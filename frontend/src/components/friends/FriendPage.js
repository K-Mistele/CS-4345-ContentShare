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
import { NavigationBar } from "../NavigationBar/NavigationBar"
import Header from "../Header/Header"
import Container from '@mui/material/Container';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import friendData from "../../temp_data/friendData"
import { FriendRequest } from "./FriendRequest"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FriendsList from "./FriendsList";
import { AddNewFriend } from "./addNewFriend";

import { friendRepo } from "../../api/friendRepo"  

class FriendPage extends React.Component {

	friendRepository = new friendRepo();

	constructor() {
		super();
		this.state = {
			friends: [],
			openAddFriendDialog: false,
			openFriendRequestsDialog: false
		}
	}

	componentDidMount() {
		 this.friendRepository.getFriends()
			.then(friends =>{
			this.setState({friends: friends})
			console.log("friends successfully retreived")
			})
			.catch(error=>{
			console.log("error: ", error)
			})
			
	}

	// -------- Functions for add new friends --------
	CloseAddNewFriendDialog() {
		this.setState({openAddFriendDialog: false})
	}


	// -------- Functions for friend requests --------
	CloseFriendRequestDialog() {
		this.setState({ openFriendRequestsDialog: false })
		// also reload window to save changes?
	}
	AcceptFriend(id) {
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
				<NavigationBar page="/friends" />
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
						<AddNewFriend open={this.state.openAddFriendDialog}
							CloseDialog={() => { this.CloseAddNewFriendDialog() }} />
						<FriendRequest open={this.state.openFriendRequestsDialog}
							CloseDialog={() => { this.CloseFriendRequestDialog() }}
							AcceptFriend={id => { this.AcceptFriend(id) }}
							DeclineFriend={id => { this.DeclineFriend(id) }} />
					</Stack>
					<FriendsList friends = { this.state.friends } />
				</Container>
			</div>
		)
	}
}

export default FriendPage;