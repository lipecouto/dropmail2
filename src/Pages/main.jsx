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
import Grid2 from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { ApolloQuery, ApolloMutation } from '../server/Apollo_querys';

 export const DropMail = () =>{

    const RespData = ApolloMutation

    console.log(RespData)

    return (
        <Container>
            <CssBaseline>
                <MuiAppBar>
                    <RespData></RespData>
                    <Typography>TESTE</Typography>
                </MuiAppBar>
                <Grid2>
                    <Typography>TESTE</Typography>
                </Grid2>
                <Divider />
                <Grid2>
                    <Typography>TESTE</Typography>             
                </Grid2>
            </CssBaseline>
        </Container>
    )
}

