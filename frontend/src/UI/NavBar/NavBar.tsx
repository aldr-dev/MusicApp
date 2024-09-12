import {AppBar, Toolbar, Container, Typography, Box} from '@mui/material';
import musicAppLogo from '../../assets/images/musicAppLogo.png';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{backgroundColor: '#000', mb: 3, p: .4}}>
      <Toolbar>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Box component={NavLink} to="/" display="flex" alignItems="center" sx={{textDecoration: 'none', color: '#fff'}}>
              <img src={musicAppLogo} alt="Logo" style={{width: 55, height: 55, marginRight: 10, borderRadius: '10px'}}/>
              <Typography variant="h5" component="span">
                MusicApp
              </Typography>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;