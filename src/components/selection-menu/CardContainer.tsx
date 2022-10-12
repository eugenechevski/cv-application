import { createContext, useState } from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

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

const SelectionContext = createContext(['', (newTitle: string) => {}]);

const CardContainer = (props: any) => {
  const { updateScene } = props;
  const [selectedCard, setSelectedCard] = useState("");
  const cardsComps = {
    Simple: (
      <Card
        data={cardsData[0]}
      ></Card>
    ),
    Professional: (
      <Card
        data={cardsData[1]}
      ></Card>
    ),
    Creative: (
      <Card
        data={cardsData[2]}
      ></Card>
    ),
  };

  return (
    <SelectionContext.Provider value={[selectedCard, setSelectedCard]}>
      <div
        onDoubleClick={() => setSelectedCard("")}
        className="container flex flex-col lg:flex-row items-center justify-evenly gap-5 w-full h-full"
      >
        {cardsComps[selectedCard] ? (
          <div className="flex flex-col justify-center items-center gap-5">
                {cardsComps[selectedCard]}
              <button onClick={updateScene} className="purple-btn">Choose As Template</button>
          </div>
        ) : (
          <>
            {cardsComps["Simple"]}
            {cardsComps["Professional"]}
            {cardsComps["Creative"]}
          </>
        )}
      </div>
    </SelectionContext.Provider>
  );
};

export { CardContainer, SelectionContext };
