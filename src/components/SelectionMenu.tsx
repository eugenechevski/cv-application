import CardContainer from "./CardContainer";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

const cardsData = [
  {
    title: "Simple",
    iconObj: (
      <FontAwesomeIcon
        className="text-9xl"
        icon={solid("thumbs-up")}
      ></FontAwesomeIcon>
    ),
  },
  {
    title: "Professional",
    iconObj: (
      <FontAwesomeIcon
        className="text-9xl"
        icon={solid("user-tie")}
      ></FontAwesomeIcon>
    ),
  },
  {
    title: "Creative",
    iconObj: (
      <FontAwesomeIcon
        className="text-9xl"
        icon={solid("lightbulb")}
      ></FontAwesomeIcon>
    ),
  },
];

const SelectionMenu = () => {
  const [fileName, updateFileName] = useState("Creative");

  return (
    <div className="h-full w-full flex justify-center items-center">
      <CardContainer
        onInspect={updateFileName}
        cardsData={cardsData}
      ></CardContainer>
      <Modal fileName={fileName}></Modal>
    </div>
  );
};

export default SelectionMenu;
