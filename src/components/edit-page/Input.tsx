import { useState } from "react";
import uniqid from "uniqid";

const Input = (props: any) => {
  const { state, updateState, title } = props;
  const [isValidInput, setValidity] = useState(false);

  const handleNewInput = (e: Event) => {
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

    state.current = target.value;
    updateState({current: target.value});
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-full w-full" key={uniqid()}>
      <h1 className="text-3xl h-1/6 w-full flex items-center justify-center">{title}</h1>
      <input
        autoFocus={true}
        value={state.current}
        type="text"
        onChange={(e: any) => handleNewInput(e)}
        className={"input input-bordered w-full max-w-xs" + (!isValidInput ? ' input-error' : '')}
      />
    </div>
  );
};

export default Input;
