import {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {ListItemIcon,
        ListItemText,
        ListItem,List,
        Toolbar,
        AppBar,
        Divider,
        IconButton,
        CssBaseline,
        Typography } from '@material-ui/core';
import { AiFillRead } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { IoIosCreate } from "react-icons/io";
import { FaUserCircle,FaUserCheck } from "react-icons/fa";


import Link from "next/link";

import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import Drawer from './Drawer'
import './Header.css'




const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



const MiniDrawer = () => {



  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
     <>
    <div>

  <Toolbar>
    <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
      >
    <Drawer />
   </IconButton>
  <Typography variant="h6" noWrap>
   <Link href='/'>
   <a >Geeksocean.com</a>
   </Link>
  </Typography>
</Toolbar>

    </div>
    <style global jsx>{`
.drawer-icons{
 font-size: 23px;
}
a{
  color:white!important;
}
.MuiToolbar-root{
 height: 5px!important;
 background-color: #6442E0!important;
}
.MuiSvgIcon-root {
  font-size: 2.2rem!important;

}
.MuiTypography-h6{
    font-size: 1.3rem!important;
}
.MuiIconButton-edgeStart {
    margin-left: -9px!important;
}

      `}</style>
      </>
  );
}

export default MiniDrawer;
