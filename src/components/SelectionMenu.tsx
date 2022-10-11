import CardContainer from "Components/selection-menu/CardContainer";
import Modal from "Components/selection-menu/Modal";
import { useState } from "react";

const SelectionMenu = () => {
  const [fileName, updateFileName] = useState("Creative");

  return (
    <div className="h-full w-full flex justify-center items-center">
      <CardContainer onInspect={updateFileName}></CardContainer>
      <Modal fileName={fileName}></Modal>
    </div>
  );
};

export default SelectionMenu;
