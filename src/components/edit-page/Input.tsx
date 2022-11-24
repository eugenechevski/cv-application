import { useState } from "react";

const Input = (props: any) => {
  const { state, updateState, title } = props;
  const [isValidInput, setValidity] = useState(false);

  const updateInput = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.value.length > 30) {
      target.setCustomValidity(`The length of ${(title as string).toLowerCase()} cannot exceed 30 characters.`);
      setValidity(false);
      return;
    } else if (target.value.length === 0) {
      target.setCustomValidity(`${title} has to have at least one character.`);
      setValidity(false);
    } else {
      setValidity(true);
    }

    updateState(target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">{title}</h1>
      <input
        value={state}
        type="text"
        onChange={(e: any) => updateInput(e)}
        className={"input input-bordered w-full max-w-xs" + (!isValidInput ? ' input-error' : '')}
      />
    </div>
  );
};

export default Input;
