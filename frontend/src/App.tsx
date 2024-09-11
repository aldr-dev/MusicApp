import {Container} from '@mui/material';
import NavBar from './UI/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';

const App = () => {
  return (
    <>
      <NavBar/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Artists/>} />
          <Route path="/albums/:id" element={<Albums/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;