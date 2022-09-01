import HttpCliente from '../servicios/HttpCliente'

export const guardarCurso = async (curso, imagen) =>{
    const endPointCurso = '/cursos';
    const promesaCurso = HttpCliente.post(endPointCurso, curso);

    if(imagen){
        
     const endPointImagen = '/documento';  
     const promesaDocumento = HttpCliente.post(endPointImagen, imagen); 
     return await Promise.all([promesaCurso,promesaDocumento]);
    
    } 
    else{
        return await Promise.all([promesaCurso]);
    }
    
};

export const paginacionCurso = (paginador) => {

    return new Promise( (resolve, eject) => {
        HttpCliente.post('/cursos/report', paginador).then(response =>{
            resolve(response);
        });
    })
}