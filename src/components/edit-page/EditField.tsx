import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";
import { NavigationContext } from "Components/EditPage";
import uniqid from "uniqid";

const EditField = (props: any) => {
  const { field } = props;
  const [selectPrevious, selectNext] = useContext(NavigationContext);

  return (
    <div
      className="flex w-full h-full justify-center items-center"
      key={uniqid()}
    >
      <div className="w-full h-full basis-1/6 justify-center items-center hidden sm:flex">
        <button
          className="btn btn-circle btn-secondary"
          onClick={() => selectPrevious()}
        >
          <FontAwesomeIcon
            className="text-4xl"
            icon={solid("arrow-left")}
          ></FontAwesomeIcon>
        </button>
      </div>
      <div className="w-full h-full sm:basis-2/3">{field}</div>
      <div className="basis-1/6 w-full h-full justify-center items-center hidden sm:flex">
        <button
          className="btn btn-circle btn-secondary"
          onClick={() => selectNext()}
        >
          <FontAwesomeIcon
            className="text-4xl"
            icon={solid("arrow-right")}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default EditField;
