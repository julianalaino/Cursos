import React, {useState, useEffect} from 'react';

export default function ControlTyping(texto, delay){
    const [textoValor, setTextoValor] = useState();

    useEffect(() => {

        //Haré un semanforo que vaya evaluando cuando el usuario deja de escribir

        const manejador = setTimeout(()=>{
            setTextoValor(texto);
        }, delay);

        return () =>{
            clearTimeout(manejador);
        }
    }, [texto])

    return textoValor;
}