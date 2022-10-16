import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const EditEntry = (props: any) => {
  const { title, field } = props;

  return (
    <div className="flex">
      <FontAwesomeIcon
        className="text-9xl"
        icon={solid("arrow-left")}
      ></FontAwesomeIcon>
      <div className="flex flex-col">
        <h1>{title}</h1>
        {field}
      </div>
      <FontAwesomeIcon
        className="text-9xl"
        icon={solid("arrow-right")}
      ></FontAwesomeIcon>
    </div>
  );
};

export default EditEntry;
