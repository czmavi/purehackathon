import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { AppState } from '../reducers';
import { authLogoutAction } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navigationLinks: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
}));

interface IMenuProps {
  authLogoutAction: typeof authLogoutAction;
  isAuthenticated: boolean;
}

const Menu: React.FC<IMenuProps> = ({ children, isAuthenticated, authLogoutAction }) => {
  const classes = useStyles();

  if (!isAuthenticated) {
    return null;
  }

  const logout = () => {
    authLogoutAction();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.navigationLinks}>
            <Link className={classes.link} component={RouterLink} to="/">
              Dashboard
            </Link>
            <Link className={classes.link} component={RouterLink} to="/users">
              Users
            </Link>
            <Link className={classes.link} component={RouterLink} to="/devices">
              Devices
            </Link>
            <Link className={classes.link} component={RouterLink} to="/groups">
              Groups
            </Link>
          </div>
          <Button type="button" onClick={logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = {
  authLogoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
