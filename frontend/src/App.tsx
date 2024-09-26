import {Container} from '@mui/material';
import NavBar from './UI/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from './features/trackHistory/TrackHistory';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <NavBar/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Artists/>} />
          <Route path="/albums/:id" element={<Albums/>} />
          <Route path="/tracks/:id" element={<Tracks/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/track-history" element={
            <ProtectedRoute isAllowed={user && user.role === 'user'}>
              <TrackHistory/>
            </ProtectedRoute>
          } />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;