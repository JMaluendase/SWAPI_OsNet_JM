import React from "react";

interface ButtonProps {
  label?: string;
  isLoading: boolean;
  getData: () => void;
}

const Button: React.FC<ButtonProps> = ({ label = "Buscar", isLoading, getData }) => {
  return (
    <button className="submit-button" onClick={getData} disabled={isLoading}>
      {isLoading ? "Buscando..." : label}
    </button>
  );
};

export default Button;
