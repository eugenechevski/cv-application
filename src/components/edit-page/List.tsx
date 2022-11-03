import uniqueId from "uniqueid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState, useCallback } from "react";

const uniqueidGenerator = uniqueId();

// TODO: add the feature for moving items up and down
// TODO: use 

const List = (props: any) => {
  const state: Set<string> = props.state;
  const updateState: (newState: Set<string>) => void = props.updateState;

  /**
   * Functions for manual state changes:
   */
  const [, render] = useState({});
  const forceUpdate = useCallback(() => render({}), []);

  const [isInputOn, setInputMode] = useState(false);
  const [currentModified, updateModified] = useState("");
  const [currentInput, updateInput] = useState('');

  const addEntry = (newEntry: string) => {
    state.add(newEntry);
    updateState(state);
  };

  const removeEntry = (entry: string) => {
    state.delete(entry);
    updateState(state);
    forceUpdate();
  };

  const editEntry = (modifiedEntry: string) => {
    state.delete(currentModified);
    state.add(modifiedEntry);
    updateState(state);
    console.log(state);
  };

  const setNewInput = (event) => {
    updateInput(event.target.value);
  };

  const acceptInput = () => {
    if (isInputOn) {
      addEntry(currentInput);
      setInputMode(false);
    } else if (currentModified !== '') {
      editEntry(currentInput);
      updateModified('');
    }

    updateInput('');
  };

  const cancelInput = () => {
    updateInput('');
    updateModified('');
    setInputMode(false);
  };

  console.log(currentModified);

  return (
    <ul className="border rounded-lg">
      {[...state.keys()].map((entry) => (
        <li key={uniqueidGenerator()}>
          {entry}
          <div>
            <button
              className="btn btn-circle"
              onClick={removeEntry.bind(null, entry)}
            >
              <FontAwesomeIcon
                icon={solid("x")}
                className="text-xs"
              ></FontAwesomeIcon>
            </button>
            {!isInputOn ? (
              <button className="btn btn-circle" onClick={() => updateModified(entry)}>
                <FontAwesomeIcon
                  icon={solid("pen")}
                  className="text-xs"
                ></FontAwesomeIcon>
              </button>
            ): (
              <></>
            )}
          </div>
        </li>
      ))}
      {
        currentModified === '' && !isInputOn ? (
            <button className="btn btn-circle" onClick={setInputMode.bind(null, true)}>
                <FontAwesomeIcon icon={solid("plus")}></FontAwesomeIcon>
            </button>
        ) : (
          <div>
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" onChange={setNewInput}/>
            <button className="btn btn-circle" onClick={acceptInput}>
              <FontAwesomeIcon icon={solid("check")}></FontAwesomeIcon>
            </button>
            <button className="btn btn-circle" onClick={cancelInput}>
              <FontAwesomeIcon icon={solid("xmark")}></FontAwesomeIcon>
            </button>
          </div>
        )
      }
    </ul>
  );
};

export default List;
