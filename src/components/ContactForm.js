import React, {useContext} from 'react';
import Modal from "react-modal";
import shortid from  'shortid';
import {Formik, Form, Field, FieldArray, ErrorMessage} from "formik";
import {FcPhone, FcInvite, FcBusinessman} from 'react-icons/fc';
import { FaMinusCircle,FaPlusCircle } from "react-icons/fa";
import {GlobalContext} from '../Context/GlobalState';
import * as Yup from 'yup';

Modal.setAppElement('#root');
export const ContactForm = (props) => {

    const {addContact}  = useContext(GlobalContext);
       

    const initialValues = {
        name: '',
        phone: [''],
        email: [''],
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('This field is required'),
        phone: Yup.array().of( Yup.string().trim().required('This field is required').matches(/^[0-9]*$/,'Phone number should only contain numerics')),
        email: Yup.array().of( Yup.string().trim().email('Invalid email').required('This field is required'))

    })

    
    
    const onSubmit = values => {
        

        const newContact = {
            id: shortid.generate(),
            name: values.name,
            phone: [...values.phone],
            email: [...values.email]
        }

        // console.log(values);
        addContact(newContact);
        props.toggleModal(!props.open)

    }

 
    return (
        <Modal isOpen={props.open} onRequestClose={() => props.toggleModal(!props.open)} className="add-contact-modal">
                <h2>ADD A CONTACT</h2>
                <Formik 
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                    <Form className="contact-form" >
                        <div>
                            <label><i ><FcBusinessman /></i> Name</label>
                            <Field type='text' name="name" placeholder="eg. John"  className="input name"
                            />
                           <ErrorMessage  className='error' name='name' component='div' />
                        </div>
                        <div>
                            <label><i ><FcPhone /></i> Phone</label>
                            <FieldArray  name="phone"  >
                                {
                                    (fieldArrayProps) =>  {
                                        
                                         const {push, remove, form} = fieldArrayProps
                                        const {values} = form
                                        const {phone} = values

                                        return <div>
                                            {
                                                phone.map((phone, index) => 
                                                    (<div key={index}>
                                                        <Field name={`phone[${index}]`} className="input" 
                                                        type='text'
                                                        placeholder="6280769570"  />
                                                        
                                                        <div className="addFieldBtns">
                                                            <span type="button" onClick={()=> push('')} ><FaPlusCircle style={ {color: "green"}}/></span>
                                                            {index>0 && <span type="button" onClick={()=>remove(index)}><FaMinusCircle style={ {color: "red"}} /></span>}
                                                        </div>
                                                        <ErrorMessage  className='error' name='phone' component='div' />
                                                        
                                                    </div>)
                                                )
                                                
                                                
                                            }
                                        </div> 
                                    }
                                } 
                            </FieldArray>
                        </div>
                        <div>
                            <label><i><FcInvite /></i> Email</label>
                            <FieldArray  name="email"  >
                                {
                                    (fieldArrayProps) =>  {
                                        
                                         const {push, remove, form} = fieldArrayProps
                                        const {values} = form
                                        const {email} = values
                                        return <div>
                                            {
                                                email.map((email, index) => 
                                                    (<div key={index}>
                                                        <Field name={`email[${index}]`} className="input" 
                                                        type='email'
                                                        placeholder="email@domain.com"  />
                                                        <div className="addFieldBtns">
                                                            <span type="button" onClick={()=> push('')} ><FaPlusCircle style={ {color: "green"}}/></span>
                                                            {index>0 && <span type="button" onClick={()=>remove(index)}><FaMinusCircle style={ {color: "red"}} /></span>}
                                                        </div>
                                                        
                                                        {< ErrorMessage  className='error' name='email' component='div' />}
                                                    </div>)
                                                )
                                            }
                                        </div> 
                                    }
                                } 
                            </FieldArray>
                        </div>
                        <button type="submit" className="submit-btn">ADD</button>
                        
                    </Form>
                </Formik>
            </Modal>

    )
}