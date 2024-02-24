import React, { useState } from "react";
import Cookies from "js-cookie";
import "../css/Login.css";

interface Props {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarMensaje: (message: string, type: string) => void;
  user: string;
  passwordd: number;
  dnif: number;
  emailf: string;
}

const LoginForm: React.FC<Props> = ({
  setIsAuthenticated,
  mostrarMensaje,
  user,
  passwordd,
  dnif,
  emailf,
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [animationClass, setAnimationClass] = useState<string>("slide-in");
  const [formType, setFormType] = useState<"login" | "forgotPassword">("login");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === "login") {
      if (username === user && password === passwordd.toString()) {
        try {
          Cookies.set("authToken", "token_de_prueba");
          localStorage.setItem("username", username);
          mostrarMensaje("Inicio de sesión exitoso", "success_notification");
          setIsAuthenticated(true);
        } catch {
          mostrarMensaje("Ocurrió un error al iniciar sesión", "error_notification");
        }
      } else {
        mostrarMensaje("Usuario o contraseña incorrectos", "warning_notification");
      }
    } else if (formType === "forgotPassword") {
      if (emailf === email && dnif.toString() === dni) {
        mostrarMensaje("Correo de recuperación enviado", "success_notification");
      } else {
        mostrarMensaje("Los datos no coinciden", "warning_notification");
        mostrarMensaje("Correo de recuperación no enviado", "error_notification");
      }
    }
  };

  const handleFormChange = (newFormType: "login" | "forgotPassword") => {
    setAnimationClass("slide-out");
    setTimeout(() => {
      setFormType(newFormType);
      setAnimationClass("slide-in");
    }, 500);
  };

  const renderForm = () => {
    if (formType === "login") {
      return (
        <div className="container-login--father">
          <h1 className="title-form">Iniciar sesión</h1>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="input-container login">
              <input
                className="input-field2 campos-reg"
                placeholder=""
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="input-label2">Nombre de Usuario</label>
            </div>
            <div className="input-container login">
              <input
                className="input-field2 campos-reg"
                placeholder=""
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="input-label2">Contraseña</label>
            </div>
            <button className="submit-button submit-icon login-bottom" type="submit">
              <p className="text-button">Iniciar sesión</p>
            </button>
          </form>
          <button className="olvide-pass" onClick={() => handleFormChange("forgotPassword")}>
            Olvidé mi contraseña
          </button>
        </div>
      );
    } else if (formType === "forgotPassword") {
      return (
        <div className="container-login--father">
          <h1 className="title-form">Recuperación de contraseña</h1>
          <p className="desc-form">
            Diligencie los campos para la validación y restablecimiento de la
            contraseña
          </p>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="input-container login">
              <input
                className="input-field2 campos-reg"
                placeholder=""
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="input-label2">Correo Electrónico</label>
            </div>
            <div className="input-container login">
              <input
                className="input-field2 campos-reg"
                placeholder=""
                type="number"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <label className="input-label2">Documento de Identificación</label>
            </div>
            <button className="submit-button submit-icon login-bottom" type="submit">
              <p className="text-button">Enviar solicitud</p>
            </button>
          </form>
          <button className="olvide-pass" onClick={() => handleFormChange("login")}>
            Tengo mi contraseña
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <section className="panel-login">
        <section className="container-login--columns">
          <div className={`container-login ${animationClass}`}>
            {renderForm()}
          </div>
          <div className="container-content"></div>
          <section className="container-logos">
            <figure className="logos-figure">
              Jorge Eliecer Maluendas Bautista
            </figure>
          </section>
        </section>
      </section>
    </>
  );
};

export default LoginForm;
