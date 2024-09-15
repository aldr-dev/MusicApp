import {Container} from '@mui/material';
import NavBar from './UI/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Register from './features/users/Register';
import Login from './features/users/Login';

const App = () => {
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
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;