import { Container } from '@mui/system';
import React, { useState } from 'react';
import style from '../Tool/Style';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, AvatarGroup, Button, TextField, Typography } from '@mui/material';
import { loginUsuario } from '../../actions/UsuarioAction';
import { useStateValue } from '../../contexto/store';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [{usuarioSesion}, dispatch]  = useStateValue();
    const [usuario , setUsuario] = useState({
        Email : '',
        Password : ''
    })

    const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setUsuario (anterior => ({
            ...anterior,
            [name] : value
        }))
    }
    
    const navigate = useNavigate();
    const loginUsuarioBoton = e => {
        e.preventDefault();
        loginUsuario(usuario, dispatch).then(response => {
            console.log('response.data.token', response.data.token);
            if(response.status === 200) {
                window.localStorage.setItem('token_seguridad', response.data.token);
                navigate("/");
            }else{
                dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje : {
                        open : true,
                        mensaje : "Las credenciales del usuario son incorrectas"
                    }
                })
            }         


        })
    }
    return (
        <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutlinedIcon style={style.icon}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login de Usuario
                    </Typography>
                    <form style = {style.form}>
                        <TextField variant="outlined" label="Ingrese email" name="Email" value = {usuario.Email} onChange = {ingresarValoresMemoria} fullWidth margin="normal"/>
                        <TextField variant ="outlined" label = "password" name="Password" type="password" value = {usuario.Password} onChange = {ingresarValoresMemoria} fullWidth margin="normal" />
                        <Button type="submit" fullWidth onClick={loginUsuarioBoton} variant = "contained" color="primary" style={style.submit}>
                         Enviar
                        </Button>
                    </form>
                </div>
        </Container>
    );
};

export default Login;