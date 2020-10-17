import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useAuthState } from 'react-firebase-hooks/auth';

import userService from '../../services/user';
import { auth } from '../../services/firebase';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

const useStyles = makeStyles(theme => ({
  logo: {
    margin: theme.spacing(2),
    fill: theme.palette.common.white,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    border: '2px solid #fff'
  },
}));

function AppBarComponent() {
  function logout() {
    handleClose();

    return userService.logout();
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const [user] = useAuthState(auth);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Logo width={24} className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            Mock API
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt={user?.displayName || 'Admin'} src={user?.photoURL || undefined} className={classes.avatar} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem disabled>{user?.displayName || 'Admin'}</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarComponent;
