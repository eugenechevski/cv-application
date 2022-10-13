import { useContext } from "react";
import { SelectionContext } from "./CardContainer";

const Card = (props: any) => {
  const setSelectedCard = useContext(SelectionContext);
  const { title, iconObj } = props.data;

  return (
    <div
      onClick={setSelectedCard.bind(null, title)}
      className="bg-white rounded-2xl shadow-xl flex flex-col items-center gap-4 p-2 h-[30vh] w-[30vh] text-black hover:bg-neutral-content"
    >
      <h1 className="font-bold text-center">{title}</h1>
      <div className="h-[20vh] w-3/4 lg:pt-3 rounded-lg text-center flex justify-center items-center">
        {iconObj}
      </div>
    </div>
  );
};

export default Card;
