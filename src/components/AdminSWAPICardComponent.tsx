import React from "react";
import { GenericObject } from "./Container_Home";

interface CardProps {
  item: GenericObject;
  handleClick: (url: string) => void;
  className: string;
}

const CardComponent: React.FC<CardProps> = ({ item, handleClick, className }) => {
  const specialClass = item.hair_color === "blond" ? "special-card" : "";

  // Filtra las claves que no tienen valores
  const filteredEntries = Object.entries(item).filter(([_, value]) => {
    // Filtra arrays vacíos y valores falsy
    return Array.isArray(value) ? value.length > 0 : !!value;
  });

  // Saber si activar función onClick
  const clickable = className === "card__extra";

  return (
    <div
      className={`card s ${specialClass} ${className} ${clickable ? "clickable-card" : ""}`}
      onClick={clickable ? handleClick : undefined}
    >
      <div className={clickable ? "card-content" : ""}>
        <h2 className="card__title">{item.name || "Unknown"}</h2>
        <div className="card__details">
          {filteredEntries.map(([key, value], idx) => (
            <p key={idx} className="card__detail">
              {key.toUpperCase()}:{" "}
              {Array.isArray(value) ? (
                value.map((val: any, index: number) => (
                  <span
                    key={index}
                    onClick={() => handleClick(val.url)}
                    className={`${
                      typeof val === "object" && val.url ? "clickable" : ""
                    }`}
                  >
                    {index > 0 ? `, ${val.name}` : val.name}
                  </span>
                ))
              ) : (
                <span
                  onClick={() => handleClick(value.url)}
                  className={`${
                    typeof value === "object" && value.url ? "clickable" : ""
                  }`}
                >
                  {value.name || value}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
