import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import CardContainer from "./components/CardContainer";
import "./styles/App.css";

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      // TODO
    }
  }
  
  render(): React.ReactNode {
    const cardsData = [
      {
        title: 'Simple',
        iconObj: <FontAwesomeIcon className="text-9xl" icon={solid('thumbs-up')}></FontAwesomeIcon>
      },
      {
        title: 'Professional',
        iconObj: <FontAwesomeIcon className="text-9xl" icon={solid('user-tie')}></FontAwesomeIcon>
      },
      {
        title: 'Creative',
        iconObj: <FontAwesomeIcon className="text-9xl" icon={solid('lightbulb')}></FontAwesomeIcon>
      }
    ];
  
    return (
      <div className="h-full w-full flex justify-center items-center">
        <CardContainer cardsData={cardsData}></CardContainer>
      </div>
    );
  }
}

export default App;
