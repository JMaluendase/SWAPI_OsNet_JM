import ContainerButtonsLeft from "./AdminSWAPIButtonsLeft";
import CardComponent from "./AdminSWAPICardComponent";
import { processItems } from "./AdminSWAPIUtils";
import InputTxt from "./AdminSWAPIInput";
import React, { useState } from "react";
import Button from "./AdminSWAPIButton";
import axios from "axios";

interface InicioProps {
  mostrarMensaje: (message: string, type: string) => void;
}

const Inicio: React.FC<InicioProps> = ({mostrarMensaje}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const endpoints = [
        "people",
        "planets",
        "films",
        // "species",
        "vehicles",
        "starships",
      ];
      const data = await Promise.all(
        endpoints.map(async (endpoint) => {
          const response = await axios.get(
            `https://swapi.dev/api/${endpoint}/?search=${text}`
          );
          return response.data.results;
        })
      );
      const mergedResults = data.flat(); // Todos los van a un array
      const processedResults = await processItems(mergedResults);
      setResults(processedResults);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  

  const handleItemClick = (url: string) => {
    mostrarMensaje(url, 'warning_notification')
  };

  return (
    <div className="Efect">
      <h1 className="titulo_login">Buscador</h1>
      <hr />
      <section className="colum_table forms__box">
        <div className="form__init">
          <InputTxt text={text} onChange={(e) => setText(e.target.value)} />
          <Button isLoading={isLoading} getData={getData} />
        </div>
      </section>
      <div className="contenido">
        {results.map((result, index) => (
          <CardComponent key={index} item={result} handleClick={handleItemClick} className={''} />
        ))}
      </div>
      <ContainerButtonsLeft isLoading={isLoading} />
    </div>
  );
};

export default Inicio;
