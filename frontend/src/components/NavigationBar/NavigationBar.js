import React from "react"

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function NavigationBar(props){
  return (
    <Stack
              sx={{ mt: 4, mb: 2 }}
              direction="row"
              spacing={3}
              justifyContent="center"
            >
            
              <Button variant = {props.page === "Movies" ? "contained" : "outlined"}>Movies</Button>
              <Button variant = {props.page === "Books" ? "contained" : "outlined"} >Books</Button>
              <Button variant = {props.page === "Friends" ? "contained" : "outlined"} >Friends</Button>
    </Stack>
  )
}

export default NavigationBar; 