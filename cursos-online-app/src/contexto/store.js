import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

//Suscribe a los objetos que van a tener acceso a las variables globales
//Login, Perfil etc.
export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () =>useContext(StateContext);