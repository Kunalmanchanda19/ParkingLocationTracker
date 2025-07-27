import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DevicesIcon from '@mui/icons-material/Devices';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Master from './Master';

const drawerWidth = 240;

interface Props {

  window?: () => Window;
}

interface functions {
  name:string,
  path?:string,
  subFunctions?:functions[]
}
const functions: functions[] = [
  // { name: "Attendance System", path: "/attendance" },
  // { name: "Attendance Reports", path: "/attendance-reports" },
  // {
  //   name: "Master",
  //   // path: "",
  //   subFunctions: [
  //     { name: "SubFunction1", path: "/sub-function-1" },
  //     { name: "SubFunction2", path: "/sub-function-2" },
  //   ],
  // },
  
];


export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [IsOpen, SetIsOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    SetIsOpen(!IsOpen);
  };

  const drawer = (
    <div>

      {/* <Toolbar /> */}
      <Divider />
      <List>
        {functions.map(({name,path} , index) => (
          <ListItem key={name} disablePadding>
           <Link href={path} sx={{ textDecoration: 'none', color:'black' }}> <ListItemButton>
              <ListItemIcon>
              <DevicesIcon/>
              </ListItemIcon>
              
              <ListItemText primary={name} sx={{fontSize:16,fontFamily:'sans-serif',fontWeight: 'bolder'}}  />
            </ListItemButton> 
            </Link>
          </ListItem>
        ))}
      {/* <Master/> */}
      </List>
      
      <Divider />
      {/* <List>
        {['', '', ''].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <DevicesIcon/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
       <IconButton sx={{color:'white'}} onClick={()=>{SetIsOpen(true)
      setMobileOpen(true)}}>
          <MenuIcon sx={{fontSize:30}}  />
          </IconButton>
      {/* <CssBaseline /> */}
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={IsOpen}
          onClose={handleDrawerToggle}

          sx={{
            
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
         <Toolbar /> 
       
      </Box> */}
    </Box>
    </div>
  );
}
