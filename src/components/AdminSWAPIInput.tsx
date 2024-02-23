import React from "react";

interface InputTxtProps {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const InputTxt: React.FC<InputTxtProps> = ({ text, onChange, label = "Palabra a Buscar" }) => {
  return (
    <div className="input-container">
      <input
        className="input-field-large icon_input_dni"
        placeholder=""
        type="text"
        value={text}
        onChange={onChange}
      />
      <label className="input-label">{label}</label>
    </div>
  );
};

export default InputTxt;
