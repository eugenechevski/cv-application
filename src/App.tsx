import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/pdfjs-express-viewer";
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
  const viewer = useRef();
  const instance = useRef();
  const viewerElement = (<div className="webviewer" ref={viewer}></div>);
  const [modalContent, updateModalContent] = useState('Creative');
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

  useEffect(() => {
    if ((viewer.current as Element).childNodes.length == 0) {
      WebViewer(
        {
          path: "webviewer/lib",
          initialDoc: `pdf/${modalContent}.pdf`,
          licenseKey: "wBPhy81AfmUzlGlzywae",
        },
        viewer.current
      ).then((inst) => {
        instance.current = inst;
      });
    }
  }, []);

  useEffect(() => {
    if (instance.current) {
      (instance.current as any).loadDocument(`pdf/${modalContent}`);
    }
  }, [modalContent]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <CardContainer onInspect={updateModalContent} cardsData={cardsData}></CardContainer>
      <Modal contentContainer={viewerElement}></Modal>
    </div>
  );
}

export default App;
