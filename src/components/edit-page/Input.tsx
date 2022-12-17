import uniqid from "uniqid";

const Input = (props: any) => {
  const { data, updateData, title } = props;

  const handleNewInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    data.current = target.value;
    updateData({ current: target.value });
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-full w-full"
      key={uniqid()}
    >
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">
        {title}
      </h1>
      <input
        autoFocus={true}
        value={data.current}
        type="text"
        onChange={(e: any) => handleNewInput(e)}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default Input;
