import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';
import MailIcon from '@mui/icons-material/Mail';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MailBody from './MailBody';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMutation, useLazyQuery } from "@apollo/client";
import { GENERATE_MAIL, CHECK_MAIL  } from '../server/Apollo_querys';

import MailList from '../Components/MailList';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let drawerWidth = 440;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#f3d122',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  
  const [open, setOpen] = React.useState(true);
  const [emailData, setEmailData] = React.useState('')
  const [Mail, setMail] = React.useState('')
  const matches = useMediaQuery('(min-width:600px)');  
  const [updateCall, setUpdateCall] = React.useState(null)
  React.useEffect(() =>{
    if(!matches){
        setOpen(!open)
        drawerWidth = 240
    }
  }, [matches]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleCopyText = () => {
     if(emailData.length > 2){
      navigator.clipboard.writeText(emailData)
      toast.success('Copiado',{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 1000,
        pauseOnHover: false,
      })      
    }else{
      toast.info('Sem dados para copiar',{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 1000,
        pauseOnHover: true,
      })
    }
  }

  const  [handleEmailClick] = useMutation(GENERATE_MAIL, {
    onCompleted: (el) =>{
      
      sessionStorage.setItem('@SESSION_ID', el.introduceSession.id)
      sessionStorage.setItem('@TEMP_EMAIL', el.introduceSession.addresses[0].address)
      setEmailData(sessionStorage.getItem('@TEMP_EMAIL'))     
      
      console.log(emailData)
    },
    onError: (error) => {
        console.log(error)
    },            
  });
  

  React.useEffect(() => {
    if(sessionStorage.getItem('@TEMP_EMAIL')){
      setEmailData(sessionStorage.getItem('@TEMP_EMAIL'))
    }
  }, [ ])

  
  const [handleUpdate, {data, loading, errors}] = useLazyQuery(CHECK_MAIL)
  if(loading){
    toast.info('Carregando dados',{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 1000,
        pauseOnHover: false,
      })     
  }
  if(data){
    setUpdateCall(data)
  }
  if(errors){
    toast.error('Sessão expirada',{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 1000,
        pauseOnHover: false,
      })     
  }
  
  
  const refesh = () =>{
    toast.info('Atualização automática em 15 segundos',{
        position: toast.POSITION.TOP_LEFT,
        autoClose: 15000,
        pauseOnHover: false,
      })     
    }

    React.useEffect(() => {
        
            setInterval(() =>{
            refesh()
            handleUpdate();
            }, 15*1000)
        
    },[ handleUpdate ])
    
  
  

  const getMailBody = (data) =>{
    setMail(data)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          > 
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box padding={0.4} width={'100%'}>
                <IconButton sx={{ p: '15px', fontSize: '1rem', borderRadius: '0' }}
                onClick={handleUpdate}
                >
                                    Atualizar
                </IconButton>
                <IconButton sx={{ p: '15px', fontSize: '1rem', borderRadius: '0' }}
                  onClick={handleEmailClick}
                >
                                    Gerar Email
                </IconButton>
                <TextField id='email' label='Email' value={emailData}
                                    sx={{maxWidth: '90%', width: '90%'}}
                                    variant='outlined'
                                    InputProps={{
                                        endAdornment:   
                                                        <InputAdornment  position="end">
                                                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                                            <IconButton sx={{ p: '10px' }}
                                                            onClick={handleCopyText}
                                                            >
                                                                <ContentCopyIcon />
                                                            </IconButton>
                                                        </InputAdornment>}}
                                > {emailData}
                </TextField>
              
            </Box>
          </Toolbar>
        </AppBar>
        <ToastContainer limit={1}/>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            
          </Toolbar>
          <Box variant="permanent">
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 0.02, py: [1] }}
            > 
                <IconButton color="inherit" sx={{px: [2]}}>
                 
                </IconButton>
                
            </Typography>
          </Box>
          <Divider />
          <Box variant="permanent">
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 0.02, py: [1] }}
            > 
                <IconButton color="inherit" sx={{px: [2]}}>
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
                </IconButton>
                Inbox Mail
            </Typography>
          </Box>

          <List component="nav" sx={{display: 'flex', flexDirection: 'column'}}>
            <Divider sx={{ my: 1 }} />
            <MailList func={getMailBody} updateCall={updateCall}></MailList>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <MailBody MailBody={Mail}></MailBody>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
  
}

export default function DropMail() {
  
  return <DashboardContent />;
}