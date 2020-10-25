import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useAuthState } from 'react-firebase-hooks/auth';

import Modal from '../../components/Modal';
import userService from '../../services/user';
import { auth } from '../../services/firebase';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as GoogleLogo } from '../../assets/images/google.svg';

const useStyles = makeStyles(theme => ({
  logo: {
    margin: theme.spacing(2),
    fill: theme.palette.common.white,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    border: '2px solid #fff',
    background: theme.palette.secondary.light,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    outline: 'none',
    border: 'none',
    borderRadius: 4,
    boxSizing: 'border-box',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: theme.breakpoints.width('sm'),
    backgroundColor: theme.palette.background.paper,
  },
  modalHeaderText: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(2),
    background: theme.palette.common.white,
  },
  googleLogo: {
    marginRight: theme.spacing(1),
  },
  accountLinked: {
    marginTop: theme.spacing(2),
  },
  topMargin: {
    marginTop: theme.spacing(2),
  },
  guestBanner: {
    fontWeight: 500,
    textAlign: 'center',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[2],
    color: theme.palette.common.white,
    background: theme.palette.primary.light,
  },
}));

function AppBarComponent() {
  function logout() {
    handleCloseModal();
    setOpenModal(false);

    return userService.logout();
  }

  function linkGoogleAccount() {
    return userService.linkGoogleAccount()?.then(() => setOpenModal(false));
  }

  function unlink() {
    return user?.unlink('google.com').then(() => setOpenModal(false));
  }

  function openLinkAccount() {
    handleCloseModal();
    setOpenModal(true);
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }


  function handleCloseModal() {
    setAnchorEl(null);
  }

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const [user] = useAuthState(auth);

  const guestUser = userService.isGuest(user);

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
              <Avatar alt={user?.displayName || 'User'} src={user?.photoURL || undefined} className={classes.avatar}>{user?.displayName ? user.displayName[0] : 'M'}</Avatar>
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
              open={openMenu}
              onClose={handleCloseModal}
            >
              <MenuItem disabled>{guestUser ? 'Guest' : user?.displayName || 'User'}</MenuItem>
              {!guestUser && <MenuItem onClick={openLinkAccount}>Link Account</MenuItem>}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {guestUser && <div className={classes.guestBanner}>Guest user. View only mode enabled.</div>}
      <Modal
        isOpen={openModal}
        className={classes.modal}
        onRequestClose={() => setOpenModal(false)}
      >
        <div className={classes.paper}>
          <div className={classes.modalHeaderText}>Link with Google Account</div>
          {
            user?.providerData.find(provider => provider?.providerId === 'google.com') ?
              <div>
                <Alert severity="success" className={classes.accountLinked}>Google Account Linked</Alert>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  className={classes.topMargin}
                  onClick={unlink}
                >
                  Unlink Account
                  </Button>
              </div> :
              <Button
                fullWidth
                variant="contained"
                onClick={linkGoogleAccount}
                className={classes.googleButton}
              >
                <GoogleLogo className={classes.googleLogo} width={18} /> Link Google Account
                </Button>
          }
        </div>
      </Modal>
    </div>
  );
}

export default AppBarComponent;
