import { useState } from "react";
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

const CardContainer = (props: any) => {
  const { onInspect } = props;
  const [selectedCard, setSelectedCard] = useState("");
  const cardsComps = {
    Simple: (
      <Card
        onInspect={onInspect}
        select={setSelectedCard}
        data={cardsData[0]}
      ></Card>
    ),
    Professional: (
      <Card
        onInspect={onInspect}
        select={setSelectedCard}
        data={cardsData[1]}
      ></Card>
    ),
    Creative: (
      <Card
        onInspect={onInspect}
        select={setSelectedCard}
        data={cardsData[2]}
      ></Card>
    ),
  };

  return (
    <div
      onDoubleClick={() => setSelectedCard("")}
      className="container flex flex-col lg:flex-row items-center justify-evenly gap-5 w-full h-full"
    >
      {cardsComps[selectedCard] ? (
        <div className="flex flex-col justify-center items-center gap-5">
            {cardsComps[selectedCard]}
            <button className="bg-purple-500 text-white p-3">Choose As Template</button>
        </div>
      ) : (
        <>
          {cardsComps["Creative"]}
          {cardsComps["Professional"]}
          {cardsComps["Creative"]}
        </>
      )}
    </div>
  );
};

export default CardContainer;
