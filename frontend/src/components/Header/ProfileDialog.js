import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export class ProfileDialog extends React.Component {

	//   bookRepository = new bookRepo(); 
	constructor(props) {
		super(props);
		this.state = {
		}
	}


	handleSave() {

	}

	render() {
		return (
			<Dialog fullWidth={true} open={this.props.open} onClose={() => this.props.CloseDialog()}>
				<DialogTitle>Manage Profile</DialogTitle>
				<DialogContent>
				<Stack direction="row"  justifyContent="center">
					<Avatar
						src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
						sx={{ width: 65, height: 65 }}
					/>
					</Stack>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '29ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField id="standard-basic" required label="Username" variant="standard" />
						<TextField id="standard-basic" required label="Full Name" variant="standard" />
						<TextField id="standard-basic" required label="Password" variant="standard" />
						<TextField id="standard-basic" required label="Confirm Password" variant="standard" />
					</Box>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { m: 1, width: '60ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField id="standard-basic" required label="email" variant="standard" />
						<TextField id="standard-basic" label="Profile Image" variant="standard" />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => this.props.CloseDialog()}>Cancel</Button>
					<Button onClick={() => { this.handleSave(); this.props.CloseDialog() }}>Save</Button>
				</DialogActions>
			</Dialog>
		)
	} //end render 
} //end class 