import Notification from "./components/SWAPI_Notification";
import Container from "./components/SWAPI_Container";
import LoginForm from "./components/SWAPI_Login";
import Banner from "./components/SWAPI_Banner";
import { useState, useEffect } from "react";
import Menu from "./components/SWAPI_Menu";
import Cookies from "js-cookie";
import axios from "axios";

import "../src/css/banner.css";
import "../src/css/menu.css";
import "../src/css/contenido.css";
import "../src/css/Notificacion.css";
import "../src/css/scroll.css";
import "./App.css";
import "../src/css/responsive.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [urlGet, setUrlGet] = useState<string>("https://swapi.dev/api/people/");
  const [containerComponent, setContainerComponent] = useState<string | boolean>("Container_Home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<{ [key: string]: string }>({});

  const user = "JMALUENDAS";
  const nombre = "Jorge";
  const apellido = "Maluendas";
  const dnif = "1234567890";
  const emailf = "jmaluendasbautista@gmail.com";

  useEffect(() => {
    if (!isAuthenticated) {
      const token = Cookies.get("authToken");
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, [isAuthenticated]);


  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const cerrarNotificacion = (id: number) => {
    setNotificaciones((prevNotificaciones) => {
      const updatedNotificaciones = prevNotificaciones.map((notificacion) =>
        notificacion.id === id ? { ...notificacion, visible: false } : notificacion
      );
      return updatedNotificaciones.filter((notificacion) => notificacion.visible);
    });
  };

  const mostrarMensaje = (mensaje: string, color: string) => {
    const id = Date.now();
    const nuevaNotificacion = {
      id,
      mensaje,
      color,
      visible: true,
      timeoutId: setTimeout(() => cerrarNotificacion(id), 6000),
    };

    setNotificaciones((prevNotificaciones) => [...prevNotificaciones, nuevaNotificacion]);
  };


  useEffect(() => {
    axios
      .get("https://swapi.dev/api/")
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className={`main-content ${isMenuOpen ? "menu-open" : ""}`}>
          <Container
            Component={containerComponent as string}
            mostrarMensaje={mostrarMensaje}
            url={urlGet}
          />
          <Banner
            setContainer={setContainerComponent}
            isMenuOpen={isMenuOpen}
            nombre={nombre as string}
            apellido={apellido as string}
            setIsMenuOpen={setIsMenuOpen}
          />
          <Menu
            menuItems={menuItems}
            setUrl={setUrlGet}
            setContainer={setContainerComponent}
          />

        </div>
      ) : (
        <div>
          <LoginForm
            setIsAuthenticated={setIsAuthenticated}
            mostrarMensaje={mostrarMensaje}
            user={user}
            passwordd={8080}
            dnif={Number(dnif)}
            emailf={emailf}
          />
        </div>
      )}
      <Notification notificaciones={notificaciones} cerrarNotificacion={cerrarNotificacion} />
    </div>
  );
}

export default App;
