import { CardContainer } from "Components/selection-menu/CardContainer";
import Modal from "Components/selection-menu/Modal";
import { useState, createContext } from "react";

const SelectionMenu = (props: any) => {
  const [fileName, updateFileName] = useState("Creative");
  const { updateScene } = props;

  return (
    <div className="h-full w-full flex justify-center items-center">
      <CardContainer updateScene={updateScene} updateFileName={updateFileName}></CardContainer>
      <Modal fileName={fileName}></Modal>
    </div>
  );
};

export default SelectionMenu;
