import React from "react";

interface ContainerButtonsLeftProps {
  isLoading: boolean;
}

const ContainerButtonsLeft: React.FC<ContainerButtonsLeftProps> = ({
  isLoading,
}) => {
  return (
    <div className="buttons_left">
      {isLoading && <div className="loader"></div>}
    </div>
  );
};

export default ContainerButtonsLeft;
