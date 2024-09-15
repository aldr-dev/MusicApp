import {AppBar, Toolbar, Container, Typography, Box, Grid} from '@mui/material';
import musicAppLogo from '../../assets/images/musicAppLogo.png';
import {NavLink} from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/users/usersSlice';
import UserMenu from './UserMenu';

const NavBar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="static" sx={{backgroundColor: '#000', mb: 3, p: .4}}>
      <Toolbar>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box component={NavLink} to="/" display="flex" alignItems="center" sx={{textDecoration: 'none', color: '#fff'}}>
                <img src={musicAppLogo} alt="Logo" style={{width: 55, height: 55, marginRight: 10, borderRadius: '10px'}}/>
                <Typography variant="h5" component="span">
                  MusicApp
                </Typography>
              </Box>
            </Grid>
            {user ? (<UserMenu user={user}/>): (<AnonymousMenu />)}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;