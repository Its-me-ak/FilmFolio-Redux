
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
// import styled from 'styled-components';
import MovieWrapper from './pages/MovieWrapper';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import MyCollection from './components/MyCollection';

const App = () => {
  const isMovieDetail = useMatch('/movie-details/:id');
  return (
    <MovieProvider>
      <Toaster/>
      <SideNavbar />
      <div className='md:ml-[13rem] relative'>
        {
          !isMovieDetail && (
            <div className='flex justify-between px-6 pt-2'>
              <Header />
              <SearchBar />
            </div>
          )
        }
        <Routes>
          <Route path='/' element={<BodyContainer />} />
          <Route path='/trending' element={<TrendingMovie />} />
          <Route path='/popular' element={<PopularMovie />} />
          <Route path='/top-rated' element={<TopRatedMovie />} />
          <Route path='/bollywood' element={<BollywoodMovie />} />
          <Route path='/anime' element={<Anime />} />
          <Route path='/upcoming' element={<UpcomingMovie />} />
          <Route path='/search/:query' element={<MovieWrapper />} />
          <Route path='/search' element={<MovieWrapper />} />
          <Route path='/movie-details/:id' element={<MovieDetail />} />
          <Route path='/bookmarked-movie' element={<MyCollection/>} />
        </Routes>
      </div>
    </MovieProvider>
  );
};

export default App;
