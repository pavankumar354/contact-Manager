
const App= (state, action) => {
    switch(action.type) {
        case 'ADD_CONTACT':
            return ({
                ...state,
                contacts: [ ...state.contacts, action.payload ]
            }
            )
        case 'DELETE_CONTACT':
            return ({
                ...state,
                contacts: state.contacts.filter( (contact) => contact.id!==action.payload)
            }) 
        case 'EDIT_CONTACT':
            return ({
                ...state,
                toBeUpdated: state.contacts.filter((contact) => contact.id===action.payload),
                // contacts: state.contacts.filter( (contact) => contact.id!==action.payload)
            }) 
            
        default:
            console.log('here too')
            return state;
    }
}
export default App