import React, {useState, useContext} from 'react';
import {Contact} from "./Contact";
import { AiOutlinePlus } from 'react-icons/ai';
import {FcSearch} from 'react-icons/fc';
import {ContactForm} from "./ContactForm";
import {GlobalContext} from "../Context/GlobalState";

export const Main = () => {
    const {contacts} = useContext(GlobalContext);
    // console.log(contacts);
    
    const [isModalOpen, setModelOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [found, setFound] = useState([]);

    
    
    function searchContact(search) {
        setIsSearch(true);
        var str=search.toLowerCase();
        
        const found = contacts.filter((contact) => {
            if(contact.name.toLowerCase().includes(str) === true)
            {
                // eslint-disable-next-line
                return contact;
            }
        }
        )
        setFound(found);
        
    } 
    
 // return (
        //     found.map((contact,index) => {
        //         return <Contact key={index} contact={contact} />
        //     })
        // )
    contacts.sort((a, b) => (a.name > b.name) ? 1 : -1)

    return (
        <div className="main-container">
            <div className="utility">
                <div className="search-bar">
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} onKeyUp={() => searchContact(search) } placeholder="Search..."></input>
                <i className="search-icon" ><FcSearch /></i>
                </div>
                <span className="create" onClick={() => setModelOpen(!isModalOpen)}>CREATE NEW <i><AiOutlinePlus/></i></span>
            </div>
            {
                isSearch? isSearch && found.map((contact,index) => {
               return <Contact key={index} contact={contact} />
                  }) : contacts.map((contact,index) => {
                    return <Contact key={index} contact={contact} />
                })
            }
            {
                

                
            }
            
            
            <ContactForm open={isModalOpen} toggleModal={setModelOpen} />
            
        </div>
    )
}