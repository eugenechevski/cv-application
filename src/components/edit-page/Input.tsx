const Input = (props: any) => {
  const { state, updateState, title } = props;

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">{title}</h1>
      <input
        placeholder={state}
        type="text"
        onChange={(e: any) => updateState(e.target.value)}
        className="input input-bordered input-primary w-full max-w-xs"
      />
    </div>
  );
};

export default Input;
