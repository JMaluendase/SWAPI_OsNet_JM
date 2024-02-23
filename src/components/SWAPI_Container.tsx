import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";

interface ContainerProps {
  Component: string;
  mostrarMensaje: (mensaje: string, color: string) => void;
  url: string;
}

const Container: React.FC<ContainerProps> = ({ Component, mostrarMensaje, url }) => {
  const [containerClass, setContainerClass] = useState("container-initial");

  const Modulo = useMemo(
    () => lazy(() => import(`./${Component}.tsx`)),
    [Component]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      setContainerClass("container-final");
    }, 70);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className={`container ${containerClass}`}>
      <Suspense fallback={<div className="loader"></div>}>
        <Modulo mostrarMensaje={mostrarMensaje} url={url}/>
      </Suspense>
    </div>
  );
};

export default Container;
