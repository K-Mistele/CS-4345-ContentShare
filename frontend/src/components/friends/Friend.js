import React from "react"

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function Friend(props){

    return(
        <div>
            <TableRow
              key = { props.info.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{props.info.firstName}</TableCell>
              <TableCell align="right">{props.info.lastName}</TableCell>
              <TableCell align="right">{props.info.handle}</TableCell>
            </TableRow>
        </div>
    )
}

export default Friend; 