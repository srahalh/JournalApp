import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLoginEmailPassword, startGoogleLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

import validator from "validator";
import { setError, removeError } from "../../actions/ui";

export const LoginScreen = () => {
  /**
   * Hooks
   */

  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const { loading } = useSelector((state) => state.ui);

  //Precargando un User y Pass para prueba
  const [formValues, handleInputChange] = useForm({
    email: "hola@saidrahal.com",
    password: "123456",
  });

  //Desestructurando el estado inicial de formValues

  const { email, password } = formValues;

  /**
   * Handle
   */

  //Manejando el cambio de datos en el form

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  //Validando los datos del form

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Invalid Email"));
      return false;
    } else if (password == null) {
      dispatch(setError("The password cant be empty"));
      return false;
    }
    dispatch(removeError());
  };

  return (
    <>
      <h3 className="auth__title mb-5">Login</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          type="text"
          placeholder=" Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder=" Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary mb-5 btn-block"
          disabled={loading}
        >
          Login
        </button>

        <div className="google-btn" onClick={handleGoogleLogin}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google button"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>

        <Link to="/auth/register" className="link mt-5 d-block">
          Create a new account
        </Link>
      </form>
    </>
  );
};
