import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import searchFriendData from '../../temp_data/searchFriendData';
import RequestList from './RequestList'
import { Typography } from '@mui/material';

import { friendRepo } from "../../api/friendRepo"  


export class FriendRequest extends React.Component {

  friendRepository = new friendRepo();

  constructor(props){
      super(props); 
      this.state = {
        requests: []
      }
  }
  

  componentDidMount() {

    this.friendRepository.getUserRequests()
     .then(requests =>{
       this.setState({requests: requests})
       console.log("requests successfully retreived")
       console.log("requests: ", requests)
     })
     .catch(error=>{
       console.log("error: ", error)
    })
  }
  updateRequests = () => {

  }
  
  render() {
    return <>
      <Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
        <DialogTitle>Friend Requests</DialogTitle>
        <DialogContent>
          {
            this.state.requests.length == 0 && <Typography>No new request. </Typography>
          }
          {
            this.state.requests.length > 0 && <RequestList requests={this.state.requests} updateRequests = { this.updateRequests } updateFriends = {() => { 
              console.log("in this.updateRequests"); this.props.RefetchFriends() }} />

          }
          {/* <Button color='success'>Accept</Button>
          <Button color='error'>Decline</Button> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.CloseDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  }
}

