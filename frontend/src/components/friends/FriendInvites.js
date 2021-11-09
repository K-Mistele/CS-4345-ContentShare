import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export const FriendInvites = props =>
  <Dialog fullWidth={true} open={props.open} onClose={() => props.CloseDialog()}>
    <DialogTitle>Friend Requests</DialogTitle>
    <DialogContent>
      <Button color='success'>Accept</Button>
      <Button color='error'>Decline</Button>

    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.CloseDialog()}>Close</Button>
    </DialogActions>
  </Dialog>
