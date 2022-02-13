import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom'
import validator from 'validator';

//Import de actions
import {startRegisterWithEmailPasswordName} from '../../actions/auth'
import { setError, removeError } from '../../actions/ui';

export const RegisterScreen = () => {

     /**
     * Hooks 
     */

      const dispatch = useDispatch();
      const {msgError} = useSelector( state => state.ui);  

      //Precargando un User y Pass para prueba
      const [formValues, handleInputChange] = useForm({
          name: 'Said',
          email: 'hola@saidrahal.com',
          password: '123456',
          password2: '123456'
      });
  
      //Desestructurando el estado inicial de formValues
  
      const {name, email, password, password2} = formValues;
  
      /**
       * Handle
       */
  
      //Manejando el cambio de datos en el form
  
      const handleRegister = (e) =>{
          e.preventDefault();
          if(!isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
          }
      }
      
      //Validando los datos del form

      const isFormValid = () =>{

        if (name.trim().length === 0){
            dispatch(setError('Name is required'))
            return false;
        } else if(!validator.isEmail(email)) {
            dispatch(setError('Ivalid Email'))
            return false;
        } else if  (password !== password2 || password.length < 5){
            dispatch(setError('The password should be at least 6 character and march each other'))
            return false;
        }
        dispatch(removeError());
      }


    return (
        <>
        <h3 className="auth__title mb-5">Register</h3>
        <form
            onSubmit ={handleRegister}
        >
            {msgError && (<div className="auth__alert-error">{msgError}</div>)}

            <input
            type = "text"
            placeholder = " Name"
            name = "name"
            className="auth__input"
            autoComplete="off"
            value={name}
            onChange = {handleInputChange}
            />
            <input
            type = "text"
            placeholder = " Email"
            name = "email"
            className="auth__input" 
            autoComplete="off"
            value={email}
            onChange = {handleInputChange}
            />
            <input
            type = "password"
            placeholder = " Password"
            name = "password"
            className="auth__input"
            value={password}
            onChange = {handleInputChange}
            />
            <input
            type = "password"
            placeholder = " Confirm Password"
            name = "password2"
            className="auth__input"
            value={password2}
            onChange = {handleInputChange}
            />

            <button
                type="submit"
                className="btn btn-primary mb-5 btn-block"
                disabled={false}
            >
                Register
            </button>

            <Link
                to ="/auth/login"
                className="link mt-5 d-block"
            >All ready register?</Link>
        </form>
    </>
    )
}
