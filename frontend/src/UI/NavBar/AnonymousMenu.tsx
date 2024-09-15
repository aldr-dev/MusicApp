import {Button, Grid, styled} from '@mui/material';
import {NavLink} from 'react-router-dom';

const ActiveLink = styled(NavLink)({
  '&.active': {
    color: '#1CD760',
  },
  '&:hover': {
    textShadow: '1px 1px 3px #1CD760',
  },
});

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button component={ActiveLink} to="/register" color="inherit">
        Регистрация
      </Button>
      <Button component={ActiveLink} to="/login" color="inherit">
        Авторизация
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;