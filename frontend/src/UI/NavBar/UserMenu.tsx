import React, { useState } from 'react';
import {Avatar, Button, Grid, Menu, MenuItem, Typography} from '@mui/material';
import {User} from '../../types';
import {Link} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
      <Button sx={{display: 'flex', alignItems: 'center'}} onClick={handleClick}>
        <Avatar alt="Avatar" src={user.avatar} sx={{ width: 38, height: 38, cursor: 'pointer', borderRadius: '10px', border: '1px solid #eee', marginRight: '10px'}} />
        <Typography color="#fff" variant="body2">{user.displayName}</Typography>
        <KeyboardArrowDownIcon sx={{color: '#fff'}}/>
      </Button>

      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem><PersonIcon/>&nbsp;{user.username}</MenuItem>
        <hr/>
        <MenuItem to="/add-new-artist" component={Link}><PostAddIcon/>&nbsp;Добавить исполнителя</MenuItem>
        <MenuItem to="/add-new-album" component={Link}><PostAddIcon/>&nbsp;Добавить альбом</MenuItem>
        <MenuItem to="/add-new-track" component={Link}><PostAddIcon/>&nbsp;Добавить трек</MenuItem>
        <hr/>
        <MenuItem to="/track-history" component={Link}><HistoryIcon/>&nbsp;История прослушивания</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon/>&nbsp;Выйти</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;