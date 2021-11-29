import React from "react"

import { Redirect } from "react-router-dom"


import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { ProfileDialog } from "./ProfileDialog";
class Header extends React.Component{

    constructor(){
        super();
        this.state = {
            redirect: null,
            openDialog: false
        }
        this.handlePageChange = this.handlePageChange.bind(this); 
    }

    handlePageChange(pageName){
        this.setState({redirect: pageName})
    }
    handleOnClick() {
      this.setState({openDialog: true})
    }
    CloseDialog() {
      this.setState({openDialog: false})
    }
    render(){
        return (
        
        this.state.redirect ? <Redirect to = { this.state.redirect} />  :

        <AppBar sx={{ mb: 6}} position="relative">
            <Toolbar>
            {/* <CameraIcon sx={{ mr: 2 }} /> */}
            <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
            {/* <Button variant="contained" startIcon={<AccountCircleIcon/>} style={{boxShadow: "none"}} onClick = {() => this.handleOnClick()}>
                Profile
            </Button> */}
            <ProfileDialog open={this.state.openDialog}
              CloseDialog={() => { this.CloseDialog() }}/>
            </Typography>
            <Button onClick={() => this.handlePageChange("/")}
                    variant="contained" startIcon={<LogoutIcon/>} style={{boxShadow: "none"}}>
                Logout
            </Button>
            </Toolbar>
        </AppBar>
  )

  }
}

export default Header;