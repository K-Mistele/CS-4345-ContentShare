import React from "react"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Header from "../../Header/FriendHeader"
import NavigationBar from "../../NavigationBar/FriendNavigationBar"
import { MovieList } from "./movieList";
import { ViewMovieDialog } from "./viewMovieDialog";


// import { movieRepo } from "../../api/movieRepo"

import movieReviewsData from "../../../temp_data/movieReviewsData";

class FriendMoviePage extends React.Component {

  // movieRepository = new movieRepo();

  constructor() {
    super();
    this.state = {
      allMovieReviews: [],
      contentToShow: "",
      openViewMovieDialog: false,
      movieToView: {}
    }
  }

  componentDidMount() {
    //  this.movieRepository.getMovies()
    //  .then(movies =>{
    //    this.setState({allMovieReviews: movies})
    //    console.log("movies successfully retreived")
    //  })
    //  .catch(error=>{
    //    console.log("error: ", error)
    // })
    this.setState({allMovieReviews: movieReviewsData})
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
        <NavigationBar page="/movies" username={this.props.match.params.username}/>
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