import React from "react";
import Cookies from "js-cookie";

interface BannerProps {
  setContainer: React.Dispatch<React.SetStateAction<string | boolean | undefined>>;
  nombre: string;
  apellido: string;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Banner: React.FC<BannerProps> = ({
  setContainer,
  nombre,
  apellido,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const toggleSubMenu = (component?: string | boolean) => {
    if (component !== undefined && typeof component === "string") {
      setContainer(component);
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    setContainer(false);
    window.location.reload();
  };

  return (
    <header className="banner">
      <div
        className="banner__menu-hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></div>
      <nav className="banner__nav">
        <a
          className="banner__logo"
          target="_blank"
          href="https://www.berlinasdelfonce.com/"
        >
          <figure className="banner__logo-img"></figure>
        </a>
        <div className="banner__title" onClick={() => toggleSubMenu("Home")}>
          <h2 className="banner__title-app">Star WarsApp</h2>
        </div>
        <section className="banner__logout">
          <div className="banner__logout-content">
            <figure className="banner__logout-figure">
              <div className="banner__logout-div">
                <h3 className="banner__logout-user">{nombre + " " + apellido}</h3>
                <div className="banner__logout-button"></div>
              </div>
            </figure>
            <section className="banner__container-logout">
              <ul className="banner__container-items">
                <li className="banner__item">
                  <a className="banner__item-url">Configuraciones</a>
                </li>
                <div className="banner__line"></div>
                <li className="banner__item">
                  <a className="banner__item-url">Preferencias</a>
                </li>
                <div className="banner__line"></div>
                <li className="banner__item" onClick={handleLogout}>
                  <a className="banner__item-url">Cerrar sesión</a>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Banner;
