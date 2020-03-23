import { Drawer, Button } from 'antd';
import '../node_modules/antd/dist/antd.css';
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
import { signout, isAuth } from "../actions/auth";
import Link from "next/link";
import { AiFillRead, AiFillGift } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { IoIosCreate,IoMdSettings } from "react-icons/io";
import { FaUserCircle,FaUserCheck,FaUsers,FaUser  } from "react-icons/fa";
import { MdDeleteSweep,MdHelp } from "react-icons/md";
import GoogleLogin from './auth/LoginGoogle';
import FacebookLogin from './auth/LoginFacebook';

import Router from "next/router";



class Sidebar extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <MenuIcon  type="primary" onClick={this.showDrawer} />
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        <List>
   {isAuth() && isAuth().role === 0 &&
         <Link href="/user">
           <ListItem button>
          <ListItemIcon><FaUser className='drawer-icons'/></ListItemIcon>
          <ListItemText>{`${isAuth().name}`}</ListItemText>
        </ListItem>
        </Link>
      }


        {isAuth() && isAuth().role === 1 &&
        <Link href="/admin">
          <ListItem button>
          <ListItemIcon><FaUserCheck className='drawer-icons'/></ListItemIcon>
          <ListItemText>{`${isAuth().name}`}</ListItemText>
        </ListItem>
        </Link>
      }


     {!isAuth() && <Link href="/signin">
            <ListItem button>
              <ListItemIcon><GoSignIn className='drawer-icons'/></ListItemIcon>
              <ListItemText>Signin</ListItemText>
            </ListItem>
            </Link>}


          {!isAuth() &&  <Link href="/signup">
             <ListItem button>
              <ListItemIcon><FaUserCircle className='drawer-icons'/></ListItemIcon>
              <ListItemText>Signup</ListItemText>
            </ListItem>
            </Link>
           }

    { isAuth() && isAuth().role===1 &&
      <Link  href="/admin/crud/blog">
      <ListItem button>
              <ListItemIcon><IoIosCreate className='drawer-icons'/></ListItemIcon>
              <ListItemText>Write a blog</ListItemText>
            </ListItem>
      </Link>}

      { isAuth() && isAuth().role===1 &&
        <Link  href="/admin/crud/blogs">
        <ListItem button>
                <ListItemIcon><MdDeleteSweep className='drawer-icons'/></ListItemIcon>
                <ListItemText>Edit Blog</ListItemText>
              </ListItem>
        </Link>}

      { isAuth() && isAuth().role===1 &&
        <Link  href="/admin/crud/category-tag">
        <ListItem button>
                <ListItemIcon><IoIosCreate className='drawer-icons'/></ListItemIcon>
                <ListItemText>Add Tag /Category</ListItemText>
              </ListItem>
        </Link>}



          { isAuth() && isAuth().role===1 &&
            <Link  href="/admin/crud/offerletter">
            <ListItem button>
                    <ListItemIcon><AiFillGift className='drawer-icons'/></ListItemIcon>
                    <ListItemText>Offer Letter</ListItemText>
                  </ListItem>
            </Link>}



              { isAuth() && isAuth().role===1 &&
                <Link  href="/admin/crud/users">
                <ListItem button>
                        <ListItemIcon><FaUsers className='drawer-icons'/></ListItemIcon>
                        <ListItemText>Users</ListItemText>
                      </ListItem>
                </Link>}


         <Link href="/Help">
            <ListItem button>
              <ListItemIcon><MdHelp className='drawer-icons'/></ListItemIcon>
              <ListItemText>Help</ListItemText>
            </ListItem>
        </Link>

        { isAuth() &&
          <Link  href="/user/setting">
          <ListItem button>
                  <ListItemIcon><IoMdSettings className='drawer-icons'/></ListItemIcon>
                  <ListItemText>Setting</ListItemText>
                </ListItem>
          </Link>}

            {isAuth() &&
              <ListItem button
                style={{ cursor: "pointer" }}
                onClick={() => signout(() => Router.replace(`/`))}>
              <ListItemIcon><GoSignOut className='drawer-icons'/></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          }

          {!isAuth() &&
              <>
              <GoogleLogin />
              <br />
              <FacebookLogin />
              </>
        }

        </List>
        </Drawer>
        <style global jsx>{`
  .ant-drawer-body{
    padding: 10px!important;
  }
  .MuiListItem-root{
    padding-bottom: 15px!important;

  }

          `}</style>
      </div>
    );
  }
}

export default Sidebar;
