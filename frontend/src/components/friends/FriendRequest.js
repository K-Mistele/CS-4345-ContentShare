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

export class FriendRequest extends React.Component {
  state={
    requests: []
  }

  componentDidMount() {
    this.setState({
      requests: searchFriendData
    })
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
            this.state.requests.length > 0 && <RequestList requests={this.state.requests}/>

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

