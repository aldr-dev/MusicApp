import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import {User} from '../../types';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit"><PersonIcon/> Привет, {user.username} <KeyboardArrowDownIcon/></Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>История прослушивания</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;