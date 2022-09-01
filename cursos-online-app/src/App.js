import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import theme from "./theme/theme";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, Snackbar } from "@mui/material";
import AppNavbar from "./componentes/navegacion/AppNavbar";
import { useStateValue } from "./contexto/store";
import { obtenerUsuarioActual } from "./actions/UsuarioAction";
import RutaSegura from "./componentes/navegacion/RutaSegura";
import NuevoCurso from "./componentes/cursos/NuevoCurso";
import PaginadorCurso from "./componentes/cursos/PaginadorCurso";

function App() {
  const [{ openSnackbar }, dispatch] = useStateValue();

  const [iniciaApp, setIniciaApp] = useState(false); //Lo que se hace es ir al servidor
  //Para saber si el usuario esta en  sesion, pero tiene que enterarse de que vuelve, para eso usamos IniciaApp

  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }} //Estilo para el texto
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        } //Le pongo este evento porque sino el autoHideDuration no funciona
      ></Snackbar>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Routes>
              <Route exact path="/auth/login" element={<Login />} />
              <Route
                exact
                path="/auth/registrar"
                element={<RegistrarUsuario />}
              />

              <Route
                exact
                path="/auth/perfil"
                element={
                  <RutaSegura redirectTo="/auth/login">
                    <PerfilUsuario />
                  </RutaSegura>
                }
              />

              <Route
                exact
                path="/"
                element={
                  <RutaSegura redirectTo="/auth/login">
                    <PerfilUsuario />
                  </RutaSegura>
                }
              />
              <Route
              exact
              path="/curso/Nuevo"
              element={
                <RutaSegura redirectTo="/auth/login">
                  <NuevoCurso />
                </RutaSegura>
              }
              />

              <Route 
              exact
              path = "/curso/paginador"
              element ={ 
                <RutaSegura redirectTo ="/auth/login">
                    <PaginadorCurso />
                </RutaSegura>
              }
              />

            </Routes>
          </Grid>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>

    /*Variable de estado, compuesta pr nombre y la funcion que permitirá cambiar el estado*/
    /*Inicialmente se cargará con un valor */
  );
}

export default App;
