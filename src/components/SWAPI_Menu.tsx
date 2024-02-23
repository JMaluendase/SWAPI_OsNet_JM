import React, { useState, useEffect } from "react";

interface MenuProps {
  menuItems: { [key: string]: string };
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setContainer: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: React.FC<MenuProps> = ({
  menuItems,
  setUrl,
  setContainer,
}) => {
  const [containerClass, setContainerClass] = useState("container-initial");

  useEffect(() => {
    const delay = setTimeout(() => {
      setContainerClass("container-final");
    }, 70);
    return () => clearTimeout(delay);
  }, []);
  

  const handleMenuItemClick = (nom_modulo: string) => {
    if (nom_modulo && typeof nom_modulo === "string") {
        setUrl(nom_modulo);
    }
    };

  return (
    <section className={`menu-container ${containerClass}`}>
      <nav className="menu">
        {Object.entries(menuItems).map(([nom_modulo, url], index) => (
          <div key={index} className="menuItem">
            <nav className="menuItem-item" onClick={() => {handleMenuItemClick(String(url)); setContainer(String('Container_Home'))}}>
              <div className="menuItem-label">{nom_modulo.toLocaleUpperCase()}</div>
            </nav>
          </div>
        ))}
          <div className="menuItem">
            <nav className="menuItem-item" onClick={() => setContainer(String('Container_Search'))}>
              <div className="menuItem-label">Buscador</div>
            </nav>
          </div>
      </nav>
    </section>
  );
};

export default Menu;
