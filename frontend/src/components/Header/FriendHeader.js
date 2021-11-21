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
import HomeIcon from '@mui/icons-material/Home';
class Header extends React.Component{

    constructor(){
        super();
        this.state = {
            redirect: null
        }
        this.handlePageChange = this.handlePageChange.bind(this); 
    }

    handlePageChange(pageName){
        this.setState({redirect: pageName})
    }

    render(){
        return (
        
        this.state.redirect ? <Redirect to = { this.state.redirect} />  :

        <AppBar sx={{ mb: 6}} position="relative">
            <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
            </Typography>
            <Button onClick={() => this.handlePageChange("/friends")}
                    variant="contained" startIcon={<HomeIcon/>} style={{boxShadow: "none"}}>
                Return to home
            </Button>
            </Toolbar>
        </AppBar>
  )

  }
}

export default Header;