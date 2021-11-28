import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import searchFriendData from '../../temp_data/searchFriendData';
import SearchList from './SearchList';

import { friendRepo } from "../../api/friendRepo" 

export class AddNewFriend extends React.Component {

  friendRepository = new friendRepo(); 

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      clicked: false,
      newFriend: ""
    }
  }

  componentDidMount() {
    this.setState({
      users: searchFriendData
    })
  }

  addFriend = () => {
    // console.log("in save add book!. bookToAdd in BookPage", this.state)
    console.log("in add friend!!!")
    var friendToAdd = {
      "destinationUserEmail": this.state.newFriend
    }

    this.friendRepository.addFriend(friendToAdd)
      .then(() => {
        console.log("friend added!");
        // console.log("calling refetch");
        // this.props.RefetchBooks()
      })
      .catch(error => {
        console.log("error: ", error);
      })
      this.props.CloseDialog() 

  }

  handleClick() {
    console.log('showing results')
    // get the search results from backend and setState
    this.setState({ clicked: true })
  }
  
  clearResults() {
    // make sure the previous search result is erased when the dialog opens again
    this.setState({ clicked: false })
  }

  render() {
    return <>
      <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
        <DialogTitle>Add a New Friend</DialogTitle>
        <DialogContent>
        
        <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="Email"
                autoComplete="Email"
                autoFocus
                variant="standard"
                onChange={(e) =>
                  this.setState({ newFriend: e.target.value })
                }
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {this.clearResults(); this.props.CloseDialog()}}>Close</Button>
          <Button onClick={ this.addFriend }>Add Friend</Button>
        </DialogActions>
      </Dialog>
    </>
  }

}
