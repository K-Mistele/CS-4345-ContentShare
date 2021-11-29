import React from "react"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Header from "../../Header/FriendHeader"
import NavigationBar from "../../NavigationBar/FriendNavigationBar"
import { MovieList } from "./movieList";
import { ViewMovieDialog } from "./viewMovieDialog";

import { friendRepo } from "../../../api/friendRepo"


// import movieReviewsData from "../../../temp_data/movieReviewsData";

class FriendMoviePage extends React.Component {

  friendRepository = new friendRepo();

  constructor(props) {
    super(props);

    this.state = {
      allMovieReviews: [],
      contentToShow: "",
      openViewMovieDialog: false,
      movieToView: {},
    }

  }

  componentDidMount() {
    console.log("in friendMoviePage... param uuid is: ", this.props.match.params.uuid)
    console.log("props period: ", this.props)
    this.friendRepository.getAFriendsMovies(this.props.match.params.uuid)
     .then(movies =>{
       this.setState({allMovieReviews: movies})
       console.log("movies successfully retreived in friend movies page")
     })
     .catch(error=>{
       console.log("error: ", error)
    })
  }
  onMovieViewClick(movie) {
    console.log("in movie on clickkkkkk :)")
    console.log(movie)
    this.setState({ openViewMovieDialog: true })
    this.setState({ movieToView: movie });
    // this.setState({ movieToView: this.state.allMovieReviews.filter(x => x.id == movieId)[0] })
  }
  CloseViewDialog() {
    this.setState({ openViewMovieDialog: false })
  }

  render() {
    return (
      <div>
        <Header />
        <NavigationBar page="/movies" uuid={this.props.match.params.uuid}/>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
          </Stack>
          <Grid container spacing={4}>
            <MovieList movies={this.state.allMovieReviews}
              onViewClick={movie => this.onMovieViewClick(movie)}
            />
            <ViewMovieDialog movie={this.state.movieToView} open={this.state.openViewMovieDialog} CloseDialog={() => { this.CloseViewDialog() }} />
          </Grid>
        </Container>
      </div>
    )
  }
}
export default FriendMoviePage;