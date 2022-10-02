import {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import CardContainer from "./components/CardContainer";
import Modal from "./components/Modal";
import "./styles/App.css";

const App = () => {
  const [fileName, updateFileName] = useState('Creative');
  const [cardsData] = useState([
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
  ],);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <CardContainer onInspect={updateFileName} cardsData={cardsData}></CardContainer>
      <Modal fileName={fileName}></Modal>
    </div>
  );
}

export default App;
