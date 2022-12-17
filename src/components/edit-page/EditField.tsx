import uniqid from "uniqid";

const EditField = (props: any) => {
  const { field } = props;

  return (
    <div
      className="flex w-full h-full justify-center items-center"
      key={uniqid()}
    >
      <div className="w-full h-full sm:basis-2/3">{field}</div>
    </div>
  );
};

export default EditField;
