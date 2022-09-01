import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import FotoUsuarioTemp from "../../../logo.svg";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useStateValue } from "../../../contexto/store";
import { MenuIzquierda } from "./menuIzquierda";
import { MenuDerecha } from "./menuDerecha";
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  seccionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    }, //Oculta todo hasta que se encuentre con una pantalla de tipo desktop o tablet.
  },

  seccionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "#212121",
  },
}));

const BarSesion = (props) => {
  const classes = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
  const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);

  const cerrarMenuIzquierda = () => {
    setAbrirMenuIzquierda(false);
  };
  const abrirMenuIzquierdaAction = () => {
    setAbrirMenuIzquierda(true);
  };

  const cerrarMenuDerecha = () => {
    setAbrirMenuDerecha(false);
  };

  const navigate = useNavigate();
  const salirSesionApp = () => {
    console.log('salir sesion');
    localStorage.removeItem("token_seguridad");
    dispatch ({
      type : "SALIR_SESION",
      nuevoUsuario : null,
      autenticado :false
    })
    navigate('/auth/login');
  };

  const abrirMenuDerechaAction = () =>{
    setAbrirMenuDerecha(true);
  }

  


  return (
    <React.Fragment>
      <Drawer
        open={abrirMenuIzquierda}
        onClose={cerrarMenuIzquierda}
        anchor="left"
      >
        <div
          className={classes.list}
          onKeyDown={cerrarMenuIzquierda}
          onClick={cerrarMenuIzquierda}
        >
          <MenuIzquierda classes={classes} />
        </div>
      </Drawer>
      <Drawer
        open={abrirMenuDerecha}
        onClose={cerrarMenuDerecha}
        anchor="right"
      >
        <div
          role="button"
          onClick={cerrarMenuDerecha}
          onKeyDown={cerrarMenuDerecha}
        >
          <MenuDerecha
          classes={classes}
         usuario = { sesionUsuario ? sesionUsuario.usuario : null}          
         salirSesion={salirSesionApp}
         />
        </div>
      </Drawer>
      <Toolbar>
        <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
          <i className="material-icons"> menu</i>
        </IconButton>
        <Typography variant="h6">Cursos Online</Typography>
        <div className={classes.grow}></div>
        <div className={classes.seccionDesktop}>
          <Button color="inherit" onClick={salirSesionApp}>Salir</Button>
          <Button color="inherit">
            {sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ""}
          </Button>
          <Avatar src={sesionUsuario.usuario.imagenPerfil || FotoUsuarioTemp}></Avatar>
        </div>
        <div className={classes.seccionMobile}>
          <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};

export default BarSesion;
