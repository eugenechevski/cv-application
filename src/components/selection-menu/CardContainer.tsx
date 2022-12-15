import { createContext, useState, useContext, useRef } from "react";
import Card from "Components/selection-menu/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { TemplateNameContext } from "src/App";

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

const SelectionContext = createContext((newTitle: string) => {});

const CardContainer = (props: any) => {
  const { updateScene } = props;
  const [selectedCard, setSelectedCard] = useState("");
  const [wasPreviewed, setAsPreviewed] = useState(false);
  const [, updateTemplateName] = useContext(TemplateNameContext);

  const cardsComps = useRef({
    Simple: <Card data={cardsData[0]}></Card>,
    Professional: <Card data={cardsData[1]}></Card>,
    Creative: <Card data={cardsData[2]}></Card>,
  });

  return (
    <SelectionContext.Provider value={setSelectedCard}>
      <div
        onDoubleClick={() => {
            setSelectedCard("");
            setAsPreviewed(false);
          }
        }
        className="container flex flex-col lg:flex-row items-center justify-evenly gap-5 w-full h-full"
      >
        {cardsComps.current[selectedCard] ? (
          <div className="flex flex-col justify-center items-center gap-3">
            {cardsComps.current[selectedCard]}
            {wasPreviewed ? (
              <button onClick={updateScene} className="btn btn-primary">
                Choose As Template
              </button>
            ) : (
              <label
                onClick={() => {
                  (updateTemplateName as (any) => {})(selectedCard);
                  setTimeout(setAsPreviewed.bind(null, true), 10);
                }}
                htmlFor="my-modal-3"
                className="btn btn-primary"
              >
                Preview
              </label>
            )}
          </div>
        ) : (
          <>
            {cardsComps.current["Simple"]}
            {cardsComps.current["Professional"]}
            {cardsComps.current["Creative"]}
          </>
        )}
      </div>
    </SelectionContext.Provider>
  );
};

export { CardContainer, SelectionContext };
