import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import CardContainer from "./components/CardContainer";
import Modal from "./components/Modal";
import "./styles/App.css";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalContent: '',
    };
  }

  changeModalContent = (content: any) => { 
    this.setState({
      modalContent: content,
    });
  }

  render(): React.ReactNode {
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

    return (
      <div className="h-full w-full flex justify-center items-center">
        <CardContainer onInspect={this.changeModalContent} cardsData={cardsData}></CardContainer>
        <Modal modalContent={this.state.modalContent}></Modal>
      </div>
    );
  }
}

export default App;
