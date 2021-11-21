import React from "react"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Header from "../Header/Header"
import { NavigationBar } from "../NavigationBar/NavigationBar"
import { MovieList } from "./movieList";
import { ViewMovieDialog } from "./viewMovieDialog";
import { EditMovieDialog } from "./editMovieDialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddMovieDialog } from "./addMovieDialog";

import { movieRepo } from "../../api/movieRepo"

// import movieReviewsData from "../../temp_data/movieReviewsData";

class MyMoviePage extends React.Component {

  movieRepository = new movieRepo();

  constructor() {
    super();
    this.state = {
      allMovieReviews: [],
      contentToShow: "",
      openViewMovieDialog: false,
      movieToView: {},
      openEditMovieDialog: false,
      movieToEdit: {},
      tmpEditTitle: '',
      openAddMovieDialog: false,
      tmpAddTitle: ''
    }

    this.RefetchMovies = this.RefetchMovies.bind(this) // bind method to class, so I can access this
    this.onMovieDeleteClick = this.onMovieDeleteClick.bind(this)
  }

  componentDidMount() {
     this.movieRepository.getMovies()
     .then(movies =>{
       this.setState({allMovieReviews: movies})
       console.log("movies successfully retreived")
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
  // --------- Functions for editing movie ----------
  onMovieEditClick(movie) {
    console.log("in movide edit click :)")
    //console.log(movieId)
    this.setState({movieToEdit: movie})
    this.setState({ openEditMovieDialog: true })
    // this.setState({movieToEdit: movie})
    //this.setState({ movieToEdit: this.state.allMovieReviews.filter(x => x.id == movieId)[0] })
  }

  CloseEditDialog() {
    this.setState({ openEditMovieDialog: false })
  }
  SaveEditMovie(movie) {
    // do something here to save
    console.log('movie id:' + movie)
    console.log('changes saved!')
    this.setState({ openEditMovieDialog: false })
    window.location.reload(false); // force refresh to update backend, should work fine
  }
  ChangeTitle(title) {
    // temporarily save the changing value; once the save button is clicked; call SaveEditMovie()
    console.log(title)
    this.setState({ tmpEditTitle: title });
    console.log(this.state.tmpEditTitle);
  }

  // --------- Deleting movie ----------
  onMovieDeleteClick(reviewTitle) {
    console.log("Deleting a movie")
    this.movieRepository.deleteMovie(reviewTitle)
      .then(() => {
        console.log("movie deleted!!")
        console.log("calling refetch")
        this.RefetchMovies()
      })
      .catch(error => {
        console.log("error: ", error)
      })
  }

  // --------- Functions for Adding movie ----------

  onMovieAddClick() {
    console.log('Adding movie')
    this.setState({ openAddMovieDialog: true })
  }
  CloseAddDialog() {
    this.setState({ openAddMovieDialog: false })
  }
  SaveAddMovie(movieToAdd) {
    console.log("LOOK HERE...SAVE ADD MOVIE IN MY MOVIE PAGE")
    console.log("in save add movie!. movieToAdd in MoviePage", movieToAdd)
    // do something here to save
    this.movieRepository.addMovie(movieToAdd)
      .then(() => {
        this.setState({ openAddMovieDialog: true })
        console.log("movie added!!")
      })
      .catch(error => {
        console.log("error: ", error)
      })

    console.log('Added movie!')
    console.log('Checking if saving add reads full name: ' + this.state.tmpAddTitle);
    this.setState({ openAddMovieDialog: false })
    window.location.reload(false); // force refresh to update backend, should work fine
  }
  AddTitle(title) {
    // temporarily save the changing value; once the save button is clicked; call SaveEditMovie()
    console.log(title)
    this.setState({ tmpAddTitle: title });
    console.log(this.state.tmpAddTitle);
  }

  RefetchMovies() {
    console.log("refetching movies.....")
    console.log("movie repo", this.movieRepository)  // this.movieRepository is undefined here!!!
    this.movieRepository.getMovies()
      .then(movies => {
        this.setState({ allMovieReviews: movies })
        console.log("movies successfully retreived")
      })
      .catch(error => {
        console.log("error: ", error)
      })
  }
  render() {
    return (
      <div>
        <Header />
        <NavigationBar page="/movies" />
        <Container maxWidth="md">
          {/* End hero unit */}
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={() => { this.setState({ openAddMovieDialog: true }) }} color="primary" startIcon={<AddCircleOutlineIcon />}
              variant="text">Add a New Movie</Button>
          </Stack>
          <Grid container spacing={4}>
            {/* { movieReviews } */}

            <MovieList movies={this.state.allMovieReviews}
              onViewClick={movie => this.onMovieViewClick(movie)}
              onEditClick={movie => this.onMovieEditClick(movie)}
              onDeleteClick={movie => this.onMovieDeleteClick(movie)}
            />
            <ViewMovieDialog movie={this.state.movieToView} open={this.state.openViewMovieDialog} CloseDialog={() => { this.CloseViewDialog() }} />
            <EditMovieDialog movie={this.state.movieToEdit}
              open={this.state.openEditMovieDialog}
              CloseDialog={() => { this.CloseEditDialog() }}
              // SaveEditMovie={movie => this.SaveEditMovie(movie)}
              EditTitle={title => this.ChangeTitle(title)}
              RefetchMovies = { this.RefetchMovies } 
            />
            <AddMovieDialog movie={this.state.movieToEdit}
              open={this.state.openAddMovieDialog}
              CloseDialog={() => { this.CloseAddDialog() }}
              SaveAddMovie={movie => this.SaveAddMovie()}
              AddTitle={title => this.AddTitle(title)}
              RefetchMovies={this.RefetchMovies}
            />
          </Grid>
        </Container>
      </div>
    )
  }
}
export default MyMoviePage;