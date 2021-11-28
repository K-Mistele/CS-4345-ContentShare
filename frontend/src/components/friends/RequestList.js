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

class RequestList extends React.Component {

  handleAccept() {
    if (window.confirm("Are you sure you want to accept?")) {
      alert("request accepted!")
      console.log('request accepted!')
    }
  }

  handleDecline() {
    if (window.confirm("Are you sure you want to decline?")) {
      alert("request declined!")
    }
  }

  render() {
    return (
      <div className="searchResults">
        <TableContainer sx={{ mt: 2 }}>
          <Table aria-label="simple table" >
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
              {this.props.requests.map((request) => (
                <TableRow
                  key={request.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar alt="Remy Sharp" src={request.profileUrl} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {request.username}
                  </TableCell>
                  <TableCell component="th" scope="row">{request.fullName}</TableCell>
                  <TableCell component="th" scope="row">
                    {request.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  <Button color="success" onClick={() => this.handleAccept()}>Accept</Button>
                  <Button color="error" onClick={() => this.handleDecline()}>Decline</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


      </div>
    )
  }
}

export default RequestList;