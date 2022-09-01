import { AppBar } from '@mui/material';
import React from 'react';
import { useStateValue } from '../../contexto/store';
import BarSesion from './bar/BarSesion';

const AppNavbar = () => {
    const [{sesionUsuario} , dispatch] = useStateValue();

    return sesionUsuario 
    ? (sesionUsuario.autenticado == true ? <AppBar position="static"><BarSesion /></AppBar> : null )
    : null;
    
};

export default AppNavbar;