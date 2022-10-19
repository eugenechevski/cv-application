import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";
import { NavigationContext } from "Components/EditPage";


const EditEntry = (props: any) => {
  const { title, field } = props;
  const [selectPrevious, selectNext] = useContext(NavigationContext);

  return (
    <div className="flex">
      <button className="btn btn-circle btn-secondary" onClick={selectPrevious}>
        <FontAwesomeIcon
            className="text-4xl"
            icon={solid("arrow-left")}
        ></FontAwesomeIcon>
      </button>
      <div className="flex flex-col">
        <h1>{title}</h1>
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

export default EditEntry;
