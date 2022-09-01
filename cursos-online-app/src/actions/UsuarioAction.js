import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';


const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = usuario => {
    return new Promise ((resolve, eject) =>{ //El objetivo de una promesa es aguantar el proceso hasta que el servidor retorne los valores que le he solicitado
        instancia.post('/Usuario/registrar', usuario).then(response => { //El response es la respuesta del servidor
            resolve(response);
        })

    })
}

export const obtenerUsuarioActual = (dispatch) => {
    return new Promise ( (resolve, eject) => {
        HttpCliente.get('/Usuario').then((response) => {
 
            console.log("response ", response);
            if(response.data && response.data.imagenPerfil){
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
            }
           
            dispatch({
                type: 'INICIAR_SESION',
                sesion : response.data,
                autenticado : true
            });
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const actualizarUsuario = (usuario, dispatch) =>{
    return new Promise((resolve, eject)=>{
        HttpCliente.put('/Usuario', usuario).then( response =>{
           if(response.data && response.data.imagenPerfil){
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
           }
           dispatch({
                type : 'INICIAR_SESION',
                sesion : response.data,
                autenticado : true,
           });
           resolve(response);
        })
        .catch(error => {
            resolve(error.response)
        })
    })
}

export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
      instancia.post("/usuario/login", usuario).then(response => {
        if(response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile = "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }
        
        dispatch({
          type : "INICIAR_SESION",
          sesion : response.data,
          autenticado : true
        })
        
        resolve(response);
      }).catch(error => {
          resolve(error.response);
      });
    });
  };