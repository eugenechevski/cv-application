const Input = (props: any) => {
  const { state, updateState } = props;

  return (
    <input
      placeholder={state}
      type="text"
      onChange={(e: any) => updateState(e.target.value)}
      className="input input-bordered input-primary w-full max-w-xs"
    />
  );
};

export default Input;
