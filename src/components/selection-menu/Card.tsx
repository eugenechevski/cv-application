import { useContext, useState } from "react";
import { SelectionContext } from "./CardContainer";
import { InspectContext } from "Components/SelectionMenu";

const Card = (props: any) => {
  const updateFileName = useContext(InspectContext);
  const [selectedCard, setSelectedCard] = useContext(SelectionContext);
  const { title, iconObj } = props.data;

  return (
    <div
      onClick={(setSelectedCard as (newTitle: string) => {}).bind(null, title)}
      className="bg-white rounded-2xl shadow-xl flex flex-col items-center gap-4 p-2 h-[30vh] w-[30vh]"
    >
      <h1 className="font-bold text-center">{title}</h1>
      <div className="h-[20vh] w-3/4 lg:pt-3 rounded-lg text-center">
        {iconObj}
      </div>
      {
        (selectedCard as string) !== '' ? (
          <label
            onClick={updateFileName.bind(null, title)}
            htmlFor="my-modal-5"
            className="purple-btn"
          >
            Inspect
          </label>
        ) : (
          <></>
        )
      }
    </div>
  );
};

export default Card;
