import { CardContainer } from "Components/selection-menu/CardContainer";
import Modal from "Components/selection-menu/Modal";
import { useState, createContext } from "react";

const InspectContext = createContext((fileName: string) => {});

const SelectionMenu = (props: any) => {
  const [fileName, updateFileName] = useState("Creative");
  const { updateScene } = props;

  return (
    <InspectContext.Provider value={updateFileName}>
      <div className="h-full w-full flex justify-center items-center">
        <CardContainer updateScene={updateScene}></CardContainer>
        <Modal fileName={fileName}></Modal>
      </div>
    </InspectContext.Provider>
  );
};

export { SelectionMenu, InspectContext };
