import { Grid, TextField, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import style from '../Tool/Style';
import {registrarUsuario} from '../../actions/UsuarioAction';

const RegistrarUsuario = () =>{
    //Creamos una variable de estado para capturar los parametros ingresados
    const [usuario,setUsuario] = useState({
        NombreCompleto : '',
        Email : '',
        Password : '',
        ConfirmarPassword : '',
        Username : ''
    })

    const ingresarValoresMemoria = e =>{ //Esta e representa el contenido
            const {name, value} = e.target;
            setUsuario (anterior => ({
                ...anterior,
                [name]: value
                //NombreCompleto : 'vaxi drez'
            }))
    }

    const registrarUsuarioBoton = e=>{
        e.preventDefault();//Esto impide que se refresque la pagina
        registrarUsuario(usuario).then(response =>{
            console.log('Se registró exitosamente el usuario' , response);
            window.localStorage.setItem("token_seguridad", response.data.token);
        });//Le paso por parametro la variable de estado
    }
    return (
//md siginifica que como maximo se podrá visualizar en desktop
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="NombreCompleto" value={usuario.NombreCompleto} onChange = {ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su nombre y apellidos"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name = "Email" value={usuario.Email} onChange = {ingresarValoresMemoria} variant ="outlined" fullWidth label ="Ingrese su email"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name='Username' value={usuario.Username} onChange = {ingresarValoresMemoria} variant = "outlined" fullWidth label ="Ingrese su username" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name='Password' type="password" value={usuario.Password} onChange = {ingresarValoresMemoria} variant = "outlined" fullWidth label ="Ingrese su password" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name='ConfirmarPassword' type="password" value={usuario.ConfirmarPassword} onChange = {ingresarValoresMemoria} variant = "outlined" fullWidth label ="Confirme su password" />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent ="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={registrarUsuarioBoton} fullWidth variant ="contained" color="primary" size="large" style={style.submit}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

}

export default RegistrarUsuario;