
import { Routes, Route, useMatch } from 'react-router-dom';
import SideNavbar from './components/SideNavbar';
import { MovieProvider } from './context/MovieContext';
import TrendingMovie from './components/TrendingMovie';
import BodyContainer from './pages/BodyContainer';
import PopularMovie from './components/PopularMovie';
import BollywoodMovie from './components/BollywoodMovie';
import TopRatedMovie from './components/TopRatedMovie';
import Anime from './components/Anime';
import UpcomingMovie from './components/UpcomingMovie';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar';
import MovieWrapper from './pages/MovieWrapper';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import MyCollection from './components/MyCollection';
import PersonDetails from './components/PersonDetails';
import TvShows from './components/TvShows';
import SignInPage from './components/auth/SignInPage';
import SignUpPage from './components/auth/SignUpPage';

const App = () => {
  const isMovieDetail = useMatch('/movie-details/:id');
  const isPersonDetails = useMatch('/person-details/:id');
  const isTvDetails = useMatch('/tv-details/:id');
  const isSignIn = useMatch('/hip-minnow-44.accounts.dev/sign-in')
  const isSignUp = useMatch('/hip-minnow-44.accounts.dev/sign-up')


  return (
    <MovieProvider>
      <Toaster />

      <SideNavbar />
      <div className='md:ml-[13rem] relative'>
        {
          !isMovieDetail && !isPersonDetails && !isTvDetails && isSignIn && isSignUp && (
            <div className='flex justify-between px-6 pt-2'>
              <Header />
              <SearchBar />
            </div>

          )
        }
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path='/' element={<BodyContainer />} />
          <Route path='/trending' element={<TrendingMovie />} />
          <Route path='/popular' element={<PopularMovie />} />
          <Route path='/top-rated' element={<TopRatedMovie />} />
          <Route path='/bollywood' element={<BollywoodMovie />} />
          <Route path='/anime' element={<Anime />} />
          <Route path='/upcoming' element={<UpcomingMovie />} />
          <Route path='/search/:query' element={<MovieWrapper />} />
          <Route path='/search' element={<MovieWrapper />} />
          <Route path='/movie-details/:id' element={<MovieDetail type={'movie'} />} />
          <Route path='/tv-details/:id' element={<MovieDetail type={'tv'} />} />
          <Route path='/person-details/:id' element={<PersonDetails />} />
          <Route path='/bookmarked-movie' element={<MyCollection />} />
          <Route path='/tv-show' element={<TvShows />} />
        </Routes>
      </div>
    </MovieProvider>
  );
};

export default App;
