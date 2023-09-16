import React, {useReducer, createContext, useEffect} from 'react';
import AppReducer from "./AppReducer";

const initialState = {
    contacts: [
       
    ],
    toBeUpdated: []
}


export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(AppReducer,initialState, () => {
        const localData = localStorage.getItem("contacts");
        return localData? JSON.parse(localData) : initialState;
    });

    useEffect( () => {
        localStorage.setItem('contacts', JSON.stringify(state))
    }, [state]);
    //Actions
    function addContact(contact)
    {
        dispatch({
            type: 'ADD_CONTACT',
            payload: contact
        })
    }

    function deleteContact(id)
    {
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        })
    }

    function editContact(id)
    {
        dispatch({
            type: 'EDIT_CONTACT',
            payload: id
        })
    }
    

    return (
        <GlobalContext.Provider value={
            {contacts: state.contacts,
            addContact,
            deleteContact, 
            editContact,
            toBeUpdated: state.toBeUpdated
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}
