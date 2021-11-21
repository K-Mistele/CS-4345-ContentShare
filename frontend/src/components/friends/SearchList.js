import React from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

class SearchList extends React.Component {

  handleAdd() {
    if(window.confirm("Do you want to send a request?")) {
      alert("request sent!")
      console.log('request sent!')
    }
  }

  render() {
    return (
      <div className="searchResults">
        {
          this.props.users.length == 0 && <Typography sx={{mt:2}}>No user found.</Typography>
        }
        {
          this.props.users.length > 0 && 
          <TableContainer sx={{mt: 2}}>
          <Table  aria-label="simple table" >
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 600 }}> </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email&nbsp;</TableCell>
                <TableCell sx={{ fontWeight: 600 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar alt="Remy Sharp" src={user.profileUrl} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell component="th" scope="row">{user.fullName}</TableCell>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button variant="outlined" color="success" onClick={()=>this.handleAdd()}>Add</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        }
        
      </div>
    )
  }
}

export default SearchList;