import React, { useState } from 'react';
import {Button, Grid, Menu, MenuItem} from '@mui/material';
import {User} from '../../types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Link} from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/users/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit">Привет, {user.username} <KeyboardArrowDownIcon/></Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem to='/add-new-artist' component={Link}><PostAddIcon/>&nbsp;Добавить исполнителя</MenuItem>
        <MenuItem to='/add-new-album' component={Link}><PostAddIcon/>&nbsp;Добавить альбом</MenuItem>
        <MenuItem to='/add-new-track' component={Link}><PostAddIcon/>&nbsp;Добавить трек</MenuItem>
        <hr/>
        <MenuItem to='/track-history' component={Link}><HistoryIcon/>&nbsp;История прослушивания</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon/>&nbsp;Выйти</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;