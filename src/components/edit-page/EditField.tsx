import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";
import { NavigationContext } from "Components/EditPage";


const EditField = (props: any) => {
  const { field } = props;
  const [selectPrevious, selectNext] = useContext(NavigationContext);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <button className="btn btn-circle btn-secondary" onClick={selectPrevious}>
        <FontAwesomeIcon
            className="text-4xl"
            icon={solid("arrow-left")}
        ></FontAwesomeIcon>
      </button>
      <div className="border border-red-500 w-full h-full">
        {field}
      </div>
      <button className="btn btn-circle btn-secondary" onClick={selectNext}>
        <FontAwesomeIcon
            className="text-4xl"
            icon={solid("arrow-right")}
        ></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default EditField;
