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

export class AddNewFriend extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      clicked: false
    }
  }

  componentDidMount() {
    this.setState({
      users: searchFriendData
    })
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
            label="Search a user"
            variant='standard'
            fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {/* <IconButton onClick={()=> this.handleClick()}>
                  <SearchIcon />
                </IconButton> */}
                <Button onClick={()=> this.handleClick()}><SearchIcon/></Button>
              </InputAdornment>
            )
          }}
          />

          {
            this.state.clicked && <SearchList users={this.state.users} />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {this.clearResults(); this.props.CloseDialog()}}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  }

}
