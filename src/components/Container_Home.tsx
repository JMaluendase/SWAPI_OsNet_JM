// Contenido.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ContainerButtonsLeft from "./AdminSWAPIButtonsLeft";
import CardComponent from "./AdminSWAPICardComponent";
import PaginationComponent from "./AdminSWAPIPagination";

export interface GenericObject {
  [key: string]: any;
}

const Contenido: React.FC<{ url: string }> = ({ url }) => {
  const [data, setData] = useState<GenericObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [selectedItemInfo, setSelectedItemInfo] = useState<GenericObject | null>(null);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const fetchData = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      if (Array.isArray(response.data.results)) {
        const processedData = await processItems(response.data.results);
        setData(processedData);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      } else {
      }
      setIsLoading(false);
    } catch {}
  };

  const processItems = async (items: GenericObject[]) => {
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const processedItem: GenericObject = {};
        for (const [key, value] of Object.entries(item)) {
          if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string" && value[0].startsWith("http")) {
            processedItem[key] = await fetchNamesFromUrls(value);
          } else if (typeof value === "string" && value.startsWith("http")) {
            processedItem[key] = await fetchNameFromUrl(value);
          } else {
            processedItem[key] = value;
          }
        }
        return processedItem;
      })
    );
    return processedItems;
  };

  const fetchNamesFromUrls = async (urls: string[]) => {
    const names = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await axios.get(url);
          return { name: response.data.name || response.data.title || "Unknown", url: url };
        } catch {
          return { name: "Unknown", url: url };
        }
      })
    );
    return names;
  };

  const fetchNameFromUrl = async (url: string) => {
    try {
      const response = await axios.get(url);
      return { name: response.data.name || response.data.title || "Unknown", url: url };
    } catch {
      return { name: "Unknown", url: url };
    }
  };

  const handleItemClick = async (url: string) => {
    if (url) {
      try {
        const response = await axios.get(url);
        setSelectedItemInfo(response.data);
      } catch {}
    }
  };

  return (
    <div className="contenido">
      {data.map((item: GenericObject | null, index: number) => (
        item && (
          <CardComponent
            key={index}
            item={item}
            handleClick={handleItemClick}
            className={''}
          />
        )
      ))}
      {selectedItemInfo && ( // Renderizar la CardComponent solo si hay información del item seleccionado
        <CardComponent
          item={selectedItemInfo}
          handleClick={() => setSelectedItemInfo(null)} // Limpiar la información del item seleccionado al hacer clic nuevamente
          className={'card__extra'}
        />
      )}
      <PaginationComponent
        prevPage={prevPage}
        nextPage={nextPage}
        fetchData={fetchData}
      />
      <ContainerButtonsLeft isLoading={isLoading} />
    </div>
  );
};

export default Contenido;
